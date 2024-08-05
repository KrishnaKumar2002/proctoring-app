import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from 'antd';
import styled from 'styled-components';
import { LayoutWrapper } from './Router';
import { ProctoringProvider, ProctoringWrapper } from '../components/Proctering/Proctering';

// Starting Tensorflow Backend For coco-ssd. Do not Remove these Imports
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ProctoringProvider>
      <AppContainer>
        <ProctoringWrapper>
          <Router>
            <LayoutWrapper />
          </Router>
        </ProctoringWrapper>
      </AppContainer>
    </ProctoringProvider>
  );
};

export default App;
