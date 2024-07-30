import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { setupFaceDetection, setupObjectDetection } from './utils';
import { Button, Card, Col, Row } from 'antd';
import { Face } from 'tensorflow-models-face-landmarks-detection';
import { DetectedObject } from '@tensorflow-models/coco-ssd';
import { create } from 'tensorflow-models-speech-commands';
import { Footer } from 'antd/es/layout/layout';

export interface WebcamProps {
  OnFaceDetect: (faces: Face[]) => void;
  OnObjectDetect: (objects: DetectedObject[]) => void;
}

export const WebcamHolder = (props: WebcamProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [initialVoiceCaptured, setInitialVoiceCaptured] = useState(false);

  let initialVoiceSample: Float32Array;

  const captureInitialVoice = async () => {
    const recognizer = await create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();

    return new Promise<void>((resolve) => {
      recognizer.listen(
        async (result) => {
          if (result.spectrogram?.data) {
            initialVoiceSample = result.spectrogram.data;
            await recognizer.stopListening();
            resolve();
          }
        },
        { includeSpectrogram: true, probabilityThreshold: 0.5 }
      );
    });
  };

  const compareSamples = (sample1: Float32Array, sample2: Float32Array): number => {
    const length = Math.min(sample1.length, sample2.length);
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    sample1.forEach((s1, i) => {
      const s2 = sample2[i];
      dotProduct += s1 * s2;
      magnitude1 += s1 * s1;
      magnitude2 += s2 * s2;
    });

    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }

    const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
    return (similarity + 1) / 2;
  };

  const monitorVoice = async () => {
    const recognizer = await create('BROWSER_FFT');
    await recognizer.ensureModelLoaded();

    recognizer.listen(
      async (result) => {
        const currentVoiceSample = result.spectrogram?.data;
        if (currentVoiceSample && initialVoiceSample) {
          const similarity = await compareSamples(initialVoiceSample, currentVoiceSample);

          if (similarity > 0.8) {
            console.log('Voice match detected');
          } else {
            console.log('Different voice detected');
          }
        }
      },
      { includeSpectrogram: true, probabilityThreshold: 0.5 }
    );
  };

  const handleCaptureInitialVoice = async () => {
    await captureInitialVoice();
    setInitialVoiceCaptured(true);
  };

  const handleMonitorVoice = () => {
    monitorVoice();
  };

  /* 
     Face Mesh Model initialization is sensitive to re-renders.
     We use an empty dependency array to ensure this effect runs only once on mount.
  */
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
      <Row>
        <Col>
          <Button onClick={handleCaptureInitialVoice} disabled={initialVoiceCaptured}>
            Initial Audio WaveForm Acquisition
          </Button>
        </Col>
        <Col>
          <Button onClick={handleMonitorVoice} disabled={!initialVoiceCaptured}>
            Continuous Audio Acquisition
          </Button>
        </Col>
      </Row>
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
