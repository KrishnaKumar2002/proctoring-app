import Webcam from "react-webcam";
import { createDetector, Face, FaceLandmarksDetector, SupportedModels } from "tensorflow-models-face-landmarks-detection"

/*
 * Draws facial landmarks on the canvas
 * Usage: Call this function with a canvas context and an array of detected faces
 * Params : CanvasRenderingContext2D, Array<Face>
 */
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

/*
 * Initializes and returns a MediaPipe face mesh detector
 * Usage: Call this function to set up the face detection model
 * Returns: Promise<FaceLandmarksDetector | null>
 */
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


/*
 * Performs face detection on a video frame
 * Usage: Call this function with a detector, video element, canvas reference, and callback
 * Params: FaceLandmarksDetector, HTMLVideoElement, React.RefObject<HTMLCanvasElement>, (faces: Face[]) => void
 */
const detect = async (net: FaceLandmarksDetector, video: HTMLVideoElement, canvasRef: React.RefObject<HTMLCanvasElement>, onFaceDetect: (faces: Face[]) => void) => {
    if (video.readyState === 4) {
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
      onFaceDetect(faces);
      
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          drawFaceLandmarks(ctx, faces);
        }
      }
    }
  };


 /*
 * Sets up continuous face detection
 * Usage: Call this function in a useEffect hook, passing webcam and canvas refs, and a face detection callback
 * Params: React.RefObject<Webcam>, React.RefObject<HTMLCanvasElement>, (faces: Face[]) => void
 * Returns: () => void (cleanup function)
 */  
  export const setupFaceDetection = (webcamRef: React.RefObject<Webcam>, canvasRef: React.RefObject<HTMLCanvasElement>, onFaceDetect: (faces: Face[]) => void) => {
    let intervalId: NodeJS.Timeout;
  
    runFaceMesh().then(detector => {
      if (detector) {
        intervalId = setInterval(() => {
          if (webcamRef.current && webcamRef.current.video) {
            detect(detector, webcamRef.current.video, canvasRef, onFaceDetect);
          }
        }, 100);
      }
    });
  
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  };