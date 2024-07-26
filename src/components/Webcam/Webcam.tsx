import { Card } from 'antd';
import { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { createDetector, Face, FaceLandmarksDetector, SupportedModels } from "tensorflow-models-face-landmarks-detection"

export interface WebcamProps {
  OnFaceDetect: (faces: Face[]) => void;
}

export const WebcamHolder = (props: WebcamProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
   
  const detect = async (net: FaceLandmarksDetector) => {
    if (
      webcamRef.current &&
      webcamRef.current.video?.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }

      const faces = await net.estimateFaces(video);
      console.log(faces);
      props.OnFaceDetect(faces);
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawFaceLandmarks(ctx, faces);
        }
      }
    }
  };

  const drawFaceLandmarks = (ctx: CanvasRenderingContext2D, faces: Face[]) => {
    const keypointsToPlot = new Set(['leftEye', 'leftIris', 'rightEye', 'rightIris', 'faceOval' ,'lips']);
    const colorMap = {
      leftEye: 'blue',
      leftIris: 'lightblue',
      rightEye: 'green',
      rightIris: 'lightgreen',
      lips: 'skyblue',
      faceOval: 'skyblue',
    };
  
    faces.forEach(face => {
      face.keypoints.forEach(({ x, y, name }) => {
        if (keypointsToPlot.has(name?? "")) {
          ctx.fillStyle = colorMap[name as keyof typeof colorMap];
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    });
  };
  

  const runFaceMesh = async () => {
    try {
      const model = SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: 'mediapipe' as const,
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
        refineLandmarks: true,
        maxFaces: 3,
      };
      const detector = await createDetector(model, detectorConfig);
      return detector;
    } catch (error) {
      console.error('Error initializing face mesh:', error);
      return null;
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    runFaceMesh().then(detector => {
      if (detector) {
        intervalId = setInterval(() => {
          detect(detector);
        }, 100);
      }
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <Card 
    title="Live Camera Feed"
    style={{
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center",
      zIndex: 9,
      width: 640,
      height: 480,
    }}
    >
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </Card>
  );
}
