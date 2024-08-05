import { useState } from 'react';
import { MultipleChoice } from '../MultipleChoice/MultipleChoice';
import { Typography } from 'antd';

export const MCQHolder = () => {
  const questions = [
    'What is the primary purpose of the WebcamHolder component?',
    "How does the ThemeProvider component enhance the application's styling capabilities?",
    'What role does the reportWebVitals function play in the application?',
    'How does the MCQHolder component generate and manage multiple choice questions?',
    'What is the significance of the getCompletionStatus function in the MCQHolder component?',
  ];
  const [answers, setAnswers] = useState<boolean[]>(new Array(8).fill(false));

  return (
    <>
      {questions.map((question, index) => (
        <MultipleChoice
          key={index}
          question={question}
          options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
          onAnswerChange={(isAnswered) =>
            setAnswers((prevAnswers) => {
              const newAnswers = [...prevAnswers];
              newAnswers[index] = isAnswered;
              return newAnswers;
            })
          }
        />
      ))}
    </>
  );
};
