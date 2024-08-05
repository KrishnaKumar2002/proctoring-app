import { useMemo, useState } from 'react';
import { Button, message, Result, Steps, theme } from 'antd';
import { Instructions } from '../../components/Instructions';
import styled from 'styled-components';
import { LiveViewLayout } from '../Home';
import { MCQHolder } from '../../components/MCQHolder';
import { useNavigate } from 'react-router-dom';
import { ComprehensionHolder } from '../../components/ComprehensionHolder';

export const Assessment = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const steps = useMemo(
    () => [
      {
        title: 'Introduction',
        content: <Instructions />,
      },
      {
        title: 'Camera Test',
        content: <LiveViewLayout />,
      },
      {
        title: 'Multiple Choice Questions',
        content: <MCQHolder />,
      },
      {
        title: 'Context based Questions',
        content: <ComprehensionHolder />,
      },
      {
        title: 'Submission',
        content: (
          <Result
            title="Are You Sure You Want To Submit?"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  message.success('Assessment submitted successfully!').then(() => {
                    navigate('/proctoring-app/results');
                  });
                }}
              >
                Go to Result
              </Button>
            }
          />
        ),
      },
    ],
    []
  );

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const ContentContainer = styled.div`
    line-height: 260px;
    text-align: center;
    color: ${({ theme }) => theme.colors.dark};
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: 8px;
    margin-top: 16px;
  `;

  return (
    <>
      <Steps
        current={current}
        items={items}
        size="small"
        onChange={(current) => setCurrent(current)}
      />
      <ContentContainer>{steps[current].content}</ContentContainer>
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <div>{current > 0 && <Button onClick={() => prev()}>Previous</Button>}</div>
        <>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                message.success('Assessment submitted successfully!').then(() => {
                  navigate('/proctoring-app/results');
                });
              }}
            >
              Submit
            </Button>
          )}
        </>
      </div>
    </>
  );
};
