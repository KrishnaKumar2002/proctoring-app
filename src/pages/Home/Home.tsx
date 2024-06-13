import { Col, Row, Typography } from 'antd';
import React from 'react';
import { WebcamHolder } from '../../components/Webcam';

function Home() {
  return (
    <div>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>PROCTORING APP</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <WebcamHolder />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
