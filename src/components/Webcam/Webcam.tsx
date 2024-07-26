import { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { createDetector, Face, FaceLandmarksDetector, SupportedModels } from "tensorflow-models-face-landmarks-detection"

export function WebcamHolder() {
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
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawFaceLandmarks(ctx, faces);
        }
      }
    }
  };

  const drawFaceLandmarks = (ctx: CanvasRenderingContext2D, faces: Face[]) => {
    faces.forEach(face => {
      const keypoints = face.keypoints;
      ctx.fillStyle = 'aqua';
      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i].x;
        const y = keypoints[i].y;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  const runFaceMesh = async () => {
    const model = SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: 'mediapipe' as const,
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      refineLandmarks: true,
      maxFaces: 1,
    };
    return await createDetector(model, detectorConfig);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    runFaceMesh().then(detector => {
      intervalId = setInterval(() => {
        detect(detector);
      }, 0);
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <>
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
        </>
  );
}
