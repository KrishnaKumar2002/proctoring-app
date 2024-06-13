import { message } from 'antd';
import React from 'react';
import Webcam from 'react-webcam';

export function WebcamHolder() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  const onUserMediaError = (error: any) => {
    console.error('Error: ', error);
    message.error('unexpected Error Occured: ', error);
  };
  return (
    <Webcam
      videoConstraints={videoConstraints}
      onUserMediaError={onUserMediaError}
    />
  );
}
