import React, { useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message as messageEl } from 'antd';
import '../../assets/css/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../feature/auth/authSlice';
import { clearMessage } from '../../feature/message';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [messageApi, contextHolder] = messageEl.useMessage();
    const { isLoading } = useSelector(state => state.auth)
    const { message } = useSelector((state) => (state.message))

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    const onFinish = async (values) => {
        const { email, password } = values
        dispatch(login({ email, password })).unwrap().then(() => {
            navigate("/")
        })

        if (message) {
            messageApi.open({
                type: 'error',
                content: message,
            });
        }
    };

    return (
        <>
            {contextHolder}
            <div className='login-component'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}

export default Login