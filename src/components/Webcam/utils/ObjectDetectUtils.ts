import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd";
import { load } from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

/*
 * Draws bounding boxes and labels for detected objects on the canvas
 * Usage: Call this function with a canvas context and an array of detected objects
 * Params: CanvasRenderingContext2D, Array<DetectedObject>
 */
const drawObjectDetections = (ctx: CanvasRenderingContext2D, detections: DetectedObject[]) => {
  detections.forEach(detection => {
    if ( detection.class != 'person') {
    const [x, y, width, height] = detection.bbox;
    ctx.strokeStyle = "#f5222d";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = "#f5222d";
    ctx.fillText(
      `${detection.class} (${Math.round(detection.score * 100)}%)`,
      x,
      y > 10 ? y - 5 : 10
    );
}
  });
};

/*
 * Initializes and returns a COCO-SSD object detection model
 * Usage: Call this function to set up the object detection model
 * Returns: Promise<ObjectDetection | null>
 */
const runObjectDetection = async () => {
  try {
    const model = await load();
    return model;
  } catch (error) {
    console.error('Error initializing object detection:', error);
    return null;
  }
};

/*
 * Performs object detection on a video frame
 * Usage: Call this function with a model, video element, canvas reference, and callback
 * Params: ObjectDetection, HTMLVideoElement, React.RefObject<HTMLCanvasElement>, (objects: DetectedObject[]) => void
 */
const detect = async (model: ObjectDetection, video: HTMLVideoElement, canvasRef: React.RefObject<HTMLCanvasElement>, onObjectDetect: (objects: DetectedObject[]) => void) => {
  if (video.readyState === 4) {
    const detections = await model.detect(video);
    onObjectDetect(detections);
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawObjectDetections(ctx, detections);
      }
    }
  }
};



/*
 * Sets up continuous object detection
 * Usage: Call this function in a useEffect hook, passing webcam and canvas refs, and an object detection callback
 * Params: React.RefObject<Webcam>, React.RefObject<HTMLCanvasElement>, (objects: DetectedObject[]) => void
 * Returns: () => void (cleanup function)
 */
export const setupObjectDetection = (webcamRef: React.RefObject<Webcam>, canvasRef: React.RefObject<HTMLCanvasElement>, onObjectDetect: (objects: DetectedObject[]) => void) => {
  let intervalId: NodeJS.Timeout;

  runObjectDetection().then(model => {
    if (model) {
      intervalId = setInterval(() => {
        if (webcamRef.current && webcamRef.current.video) {
          detect(model, webcamRef.current.video, canvasRef, onObjectDetect);
        }
      }, 100);
    }
  });

  return () => {
    if (intervalId) clearInterval(intervalId);
  };
};
