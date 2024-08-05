import { loremIpsum } from 'react-lorem-ipsum';
import { MCQHolder } from '../MCQHolder/MCQHolder';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const ComprehensionHolder = () => {
  const generateParagraph = () =>
    loremIpsum({ avgWordsPerSentence: 10, avgSentencesPerParagraph: 5, p: 3 });

  return (
    <Typography>
      <Title level={1}>Comprehension Holder</Title>
      <Paragraph>{generateParagraph()}</Paragraph>
      <MCQHolder />
      <Paragraph>{generateParagraph()}</Paragraph>
      <MCQHolder />
    </Typography>
  );
};
