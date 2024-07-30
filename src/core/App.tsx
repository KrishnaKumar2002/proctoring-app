import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from 'antd';
import styled from 'styled-components';
import { LayoutWrapper } from './Router';

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
    <AppContainer>
      <Router>
        <LayoutWrapper />
      </Router>
    </AppContainer>
  );
};

export default App;
