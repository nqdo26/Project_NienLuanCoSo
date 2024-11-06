import React, { useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from '~/pages/Login/Login.module.scss';
import Image from '~/components/Image';
import loginLogo from '~/assets/images/loginLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '~/utils/api';
import { AuthContext } from '../../components/Context/auth.context';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password);

        if (res && res.EC === 0) {
            localStorage.setItem('access_token', res.access_token);
            notification.success({
                message: 'LOGIN USER',
                description: 'Success',
            });
            setAuth({
                isAuthenticated: true,
                user: {
                    email:res?.user?.email ?? "",
                    name: res?.user?.name ?? "",
                    _id: res?.user?._id ?? "",
                    role: res?.user?.role ?? "",
                },
            });

            navigate('/');
        } else {
            notification.error({
                message: 'LOGIN USER',
                description: res?.EM ?? 'Email or password is incorrect',
            });
        }

        console.log('Received values of form: ', res);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}>
                <div className={cx('inner')}>
                    <Image className={cx('img')} src={loginLogo} alt="Login Logo" />
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={<span className={cx('email')}>Email</span>}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<span className={cx('password')}>Password</span>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <div className={cx('action')}>
                                <Button className={cx('login-button')} type="primary" htmlType="submit">
                                    Login
                                </Button>

                                <Link to="/register">
                                    <span className={cx('register')}>Register</span>
                                </Link>

                                <Link to="/">
                                    <span className={cx('back')}>Back to HomePage</span>
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
