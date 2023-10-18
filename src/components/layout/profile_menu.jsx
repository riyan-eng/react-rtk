import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../feature/auth/authSlice';



const ProfileMenu = () => {
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout())
    }
    const items = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <Link onClick={onLogout}>Logout</Link>,
            key: '3',
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                    />
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
};

export default ProfileMenu;