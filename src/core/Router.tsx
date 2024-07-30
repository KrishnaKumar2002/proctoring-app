import { Routes, Route, useNavigate } from 'react-router-dom';
import { LiveViewLayout } from '../pages/Home';
import { Layout, Menu } from 'antd';
import { BarChartOutlined, FileTextOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const navbarItems = [
  { key: 'Test', icon: <FileTextOutlined />, label: 'Test' },
  { key: 'Results', icon: <BarChartOutlined />, label: 'Results' },
  { key: 'Live', icon: <VideoCameraOutlined />, label: 'Live' },
];

const RootRouter = () => (
  <Routes>
    <Route index path="/proctoring-app/*" element={<LiveViewLayout />} />
    <Route path="/proctoring-app/test" element={<></>} />
    <Route path="/proctoring-app/results" element={<></>} />
  </Routes>
);

export const LayoutWrapper = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Live']}
          items={navbarItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={({ key }) => navigate(`/proctoring-app/${key.toLowerCase()}`)}
        />
      </Header>
      <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            background: '#fff',
            flex: 1,
            padding: 24,
            borderRadius: 8,
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <RootRouter />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Proof Of Concept - Proctoring App - Minimal {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
