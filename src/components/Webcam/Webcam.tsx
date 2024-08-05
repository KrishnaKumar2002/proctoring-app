import Webcam from 'react-webcam';
import { Card } from 'antd';

export interface WebcamProps {
  webcamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const WebcamHolder = ({ webcamRef, canvasRef }: WebcamProps) => {
  return (
    <Card
      style={{
        position: 'relative',
        width: 640,
        height: 480,
        overflow: 'hidden',
      }}
    >
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        disablePictureInPicture
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Card>
  );
};
