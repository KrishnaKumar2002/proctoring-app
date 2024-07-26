import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import styled from 'styled-components';
import { LiveViewLayout } from '../pages/Home';
import { BarChartOutlined, FileTextOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const items = [
  {
    key: "Test",
    icon: <FileTextOutlined />,
    label: "Test",
  },
  {
    key: "Results",
    icon: <BarChartOutlined />,
    label: "Results",
  },
  {
    key: "Live",
    icon: <VideoCameraOutlined />,
    label: "Live",
  }
];


const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AppContainer>
      <Router>
        <Layout>
          <Header
            style={{
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Content style={{ padding: '0 48px'}}>
            <div
              style={{
                padding: 24,
                minHeight: "100vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <Routes>
                <Route path="/proctoring-app/" element={<></>} />
                <Route path="/proctoring-app/result" element={<></>} />
                <Route path="/proctoring-app/live" element={<LiveViewLayout />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            PROCTERING APPLICATION {new Date().getFullYear()} Created by Alwyn
          </Footer>
        </Layout>
      </Router>
    </AppContainer>
  );
};

export default App;
