import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { setupFaceDetection, setupObjectDetection } from './utils';
import { Card } from 'antd';
import { Face } from 'tensorflow-models-face-landmarks-detection';
import { DetectedObject } from '@tensorflow-models/coco-ssd';

export interface WebcamProps {
  OnFaceDetect: (faces: Face[]) => void;
  OnObjectDetect: (objects: DetectedObject[]) => void;
}

export const WebcamHolder = (props: WebcamProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Face Mesh Model initialization is sensitive to re-renders.
  // We use an empty dependency array to ensure this effect runs only once on mount. */
  useEffect(() => {
    const cleanupFaceDetection = setupFaceDetection(webcamRef, canvasRef, props.OnFaceDetect);
    const cleanupObjectDetection = setupObjectDetection(webcamRef, canvasRef, props.OnObjectDetect);

    return () => {
      cleanupFaceDetection();
      cleanupObjectDetection();
    };
  }, []);

  return (
    <Card
      title="Live Camera Feed"
      style={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9,
        width: 640,
        height: 480,
      }}
    >
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </Card>
  );
};
