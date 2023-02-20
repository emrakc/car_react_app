import React from "react";
import './App.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CarList from './ui/carList';
import CarEdit from './ui/carEdit';
import HeaderComponent from "./ui/components/header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CarList />,
  },
  {
    path: "edit/:id",
    element: <CarEdit />,
  },
]);

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="App">
      <Layout className="layout">
        <HeaderComponent />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ background: colorBgContainer, padding: 50 }}>
            <RouterProvider router={router} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>footer</Footer>
      </Layout>

    </div>
  );
}

export default App;
