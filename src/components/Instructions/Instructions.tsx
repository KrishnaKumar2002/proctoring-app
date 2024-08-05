import { Col, List, Row, Typography } from 'antd';

export const Instructions = () => {
  const instructions = [
    'This is a demo of online Proctoring on browser',
    'The Test is a sample PlaceHolder of an Online Test, Thus none of the Test Answers will be judged',
    'You are free to switch between the contents any time during the test',
    'The Results is just a live log of all the faces and objects found in the test.',
  ];
  return (
    <>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Typography.Title level={2} style={{ textAlign: 'center' }}>
            Read the following instructions carefully
          </Typography.Title>
          <List
            dataSource={instructions}
            renderItem={(item, index) => (
              <List.Item>
                <Typography.Text>{`${index + 1}. ${item}`}</Typography.Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
