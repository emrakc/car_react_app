

import React from "react";
import { Layout, Menu } from 'antd';

const { Header } = Layout;


const HeaderComponent: React.FC = () => {
    return (
        <Header>
            <Menu
                theme="dark"
                mode="horizontal"
                items={[
                    {
                        key: 'car',
                        label: 'Car List'
                    }
                ]}
            />
        </Header>
    );
}

export default HeaderComponent;