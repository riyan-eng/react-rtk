import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DownOutlined,
    SnippetsOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Avatar, Dropdown, Drawer, Button } from 'antd';
import '../assets/css/layout.css'
import { Link } from 'react-router-dom';
import ProfileMenu from '../components/layout/profile_menu';
import './root.css'

const { Header, Content, Footer, Sider } = Layout;

function getMenuItem(label, key, icon, children) {
    return {
        label, key, icon, children
    }
}


const menuItems = [
    getMenuItem(<Link to={'/'}>Dashboard</Link>, "/", <BarChartOutlined />, null),
    getMenuItem(<Link to={'/pegawai'}>Kepegawaian</Link>, "/pegawai", <TeamOutlined />, null),
    getMenuItem(<Link to={'/program'}>Program</Link>, "/program", <SnippetsOutlined />, null),
    // getMenuItem("Kepegawaian", null, <TeamOutlined />, [
    //     getMenuItem(<Link to={'/pegawai/tambah'}>Tambah</Link>, "/pegawai/tambah", null, null, null),
    //     getMenuItem(<Link to={'/pegawai'}>Daftar</Link>, "/pegawai", null, null, null),
    // ]),
    getMenuItem(<Link to={'/data_tabel'}>Data Tabel</Link>, '/data_tabel', <AppstoreOutlined />, null)
]

const Root = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const { token: { colorBgContainer } } = theme.useToken();
    return (
        <>
            <Layout hasSider>
                <Sider
                    className='drawer'
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div className='logo'>
                        <img src="/logo1.png" alt="logo 1" height={80} />
                    </div>
                    <Menu theme="dark" mode="inline" items={menuItems} />

                </Sider>
                <Layout
                    className="site-layout"
                >
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={showDrawer}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                            className='menu'
                        />
                        <Drawer
                            title="Basic Drawer"
                            width={200}
                            placement="left"
                            onClose={onClose}
                            open={open}
                        >
                            <Menu theme="dark" mode="inline" items={menuItems} />
                        </Drawer>
                        <div className='profile-header'>

                            {/* <ProfileMenu /> */}
                        </div>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                // textAlign: 'centcenterer',
                                background: colorBgContainer,
                            }}
                        >

                            <Outlet />

                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Root