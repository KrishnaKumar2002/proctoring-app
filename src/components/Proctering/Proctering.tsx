import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { Face } from 'tensorflow-models-face-landmarks-detection';
import { DetectedObject } from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import { setupFaceDetection, setupObjectDetection } from './utils';

export interface ProctoringProps {
  webcamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  faces: Face[];
  objects: DetectedObject[];
  setFaces: (faces: Face[]) => void;
  setObjects: (objects: DetectedObject[]) => void;
}

const ProctoringContext = createContext<ProctoringProps | undefined>(undefined);

export const ProctoringProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [faces, setFaces] = useState<Face[]>([]);
  const [objects, setObjects] = useState<DetectedObject[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const value = useMemo(
    () => ({
      webcamRef,
      canvasRef,
      faces,
      objects,
      setFaces,
      setObjects,
    }),
    [faces, objects]
  );

  return <ProctoringContext.Provider value={value}>{children}</ProctoringContext.Provider>;
};

export const useProctoring = () => {
  const context = useContext(ProctoringContext);
  if (context === undefined) {
    throw new Error('useProctoring must be used within a ProctoringProvider');
  }
  return context;
};

export interface ProctoringWrapperProps {
  children: React.ReactNode;
}

export const ProctoringWrapper: React.FC<ProctoringWrapperProps> = ({ children }) => {
  const { setFaces, setObjects, webcamRef, canvasRef } = useProctoring();

  const handleFaceDetect = React.useCallback(
    (detectedFaces: Face[]) => {
      setFaces(detectedFaces);
    },
    [setFaces]
  );

  const handleObjectDetect = React.useCallback(
    (detectedObjects: DetectedObject[]) => {
      const filteredObjects = detectedObjects.filter((object) => object.class !== 'person');
      setObjects(filteredObjects);
    },
    [setObjects]
  );

  useEffect(() => {
    let cleanupFaceDetection: () => void;
    let cleanupObjectDetection: () => void;

    const setupDetection = async () => {
      cleanupFaceDetection = await setupFaceDetection(webcamRef, canvasRef, handleFaceDetect);
      cleanupObjectDetection = await setupObjectDetection(webcamRef, canvasRef, handleObjectDetect);
    };

    setupDetection();

    return () => {
      if (cleanupFaceDetection) cleanupFaceDetection();
      if (cleanupObjectDetection) cleanupObjectDetection();
    };
  }, [webcamRef, canvasRef, handleFaceDetect, handleObjectDetect]);

  return <>{children}</>;
};
