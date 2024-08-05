import { useState } from 'react';
import { Col, Divider, Radio, Row, Typography } from 'antd';

interface MultipleChoiceProps {
  question: string;
  options: string[];
  onAnswerChange: (isAnswered: boolean) => void;
}

export const MultipleChoice = ({ question, options, onAnswerChange }: MultipleChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onAnswerChange(true);
  };

  return (
    <>
      <Divider />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Typography.Text style={{ margin: '0' }}>{`${question}`}</Typography.Text>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        {options.map((option, index) => (
          <Col span={12} key={index}>
            <Radio
              id={`option-${index}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            >
              {option}
            </Radio>
          </Col>
        ))}
      </Row>
      <Divider />
    </>
  );
};
