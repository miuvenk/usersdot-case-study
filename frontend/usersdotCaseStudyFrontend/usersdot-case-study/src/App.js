import { useEffect, useState } from "react";
import './App.css';
import { ConfigProvider, Layout, theme, Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import HomePage from "./home/HomePage";
const { Header, Content, Footer } = Layout;

function App() {

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const changeTheme = () => {
    setIsDarkMode((previousValue) => {
      const newTheme = !previousValue;
      localStorage.setItem("isDarkMode", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const isDarkModeLocal = localStorage.getItem("isDarkMode");
    if (isDarkModeLocal) {
      setIsDarkMode(JSON.parse(isDarkModeLocal));
    }
  }, [])
  

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: isDarkMode ? '#6256CA' : 'rgb(51 44 111)',
        },
      }}
    >
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#6256CA',
            justifyContent: 'space-between'
          }}
        >
          <h1 style={{color:'white'}} >USERSDOT CASE STUDY</h1>
          <Switch
            checkedChildren={<SunOutlined/>}
            unCheckedChildren={<MoonOutlined/>}
            onChange={changeTheme}
            defaultChecked
          />
        </Header>
        <Content
          style={{
            padding: '48px 48px',
            minHeight: '100vh'
          }}
        >
          <div
            style={{
              background: isDarkMode ? 'rgb(64 64 64)' : colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <HomePage/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Esma Nur K. - 2024
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
