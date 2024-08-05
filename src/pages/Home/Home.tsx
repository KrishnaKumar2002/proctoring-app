import { Card, Col, Row, Tooltip } from 'antd';
import { WebcamHolder } from '../../components/Webcam';
import { InboxOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { useProctoring } from '../../components/Proctering/Proctering';

export const LiveViewLayout = () => {
  const { faces, objects, webcamRef, canvasRef } = useProctoring();
  return (
    <>
      <Row>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <WebcamHolder webcamRef={webcamRef} canvasRef={canvasRef} />
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 16 }}>
        <Col>
          <Card style={{ width: 200, textAlign: 'center' }}>
            <Tooltip
              title={
                faces.length === 0
                  ? 'No face detected'
                  : faces.length === 1
                    ? 'One face detected'
                    : 'Multiple faces detected'
              }
            >
              {faces.length === 0 && <UserOutlined style={{ fontSize: 24, color: 'red' }} />}
              {faces.length === 1 && <UserOutlined style={{ fontSize: 24, color: 'green' }} />}
              {faces.length > 1 && <UsergroupAddOutlined style={{ fontSize: 24, color: 'red' }} />}
            </Tooltip>
            <p style={{ marginTop: 8 }}>FACES: {faces.length}</p>
          </Card>
        </Col>
        <Col offset={2}>
          <Card style={{ width: 200, textAlign: 'center' }}>
            <Tooltip title={objects.length === 0 ? 'No objects detected' : 'Objects detected'}>
              {objects.length === 0 && <InboxOutlined style={{ fontSize: 24, color: 'green' }} />}
              {objects.length > 0 && <InboxOutlined style={{ fontSize: 24, color: 'red' }} />}
            </Tooltip>
            <p style={{ marginTop: 8 }}>OBJECTS: {objects.length}</p>
          </Card>
        </Col>
      </Row>
    </>
  );
};
