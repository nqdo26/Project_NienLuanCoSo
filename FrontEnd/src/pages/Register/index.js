import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import classNames from 'classnames/bind';
import styles from '~/pages/Register/Register.module.scss';
import Image from '~/components/Image';
import loginLogo from '~/assets/images/loginLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserApi } from '~/utils/api';
const cx = classNames.bind(styles);

function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password } = values;

        const res = await createUserApi(name, email, password);

        if (res.EC === 1) {
            notification.error({
                message: 'ERROR',
                description: res.EM,
            });
        } else if (res.EC === 0) {
            notification.success({
                message: 'CREATE USER',
                description: res.EM,
            });
            navigate('/login');
        } else {
            notification.error({
                message: 'ERROR',
                description: 'An error occurred',
            });
        }

        console.log('Received values of form: ', res);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}>
                <div className={cx('inner')}>
                    <Image className={cx('img')} src={loginLogo} alt="Login Logo" />
                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item
                            label={<label className={cx('lable-name')}>Name</label>}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<label className={cx('lable-email')}>Email</label>}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'The input is not a valid email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<label className={cx('lable-pw')}>Password</label>}
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
                            label={<label className={cx('lable-re-pw')}>Re-Password</label>}
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('The two passwords that you entered do not match!'),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <div className={cx('action')}>
                                <Button className={cx('register-button')} type="primary" htmlType="submit">
                                    Register
                                </Button>

                                <Link to="/login">
                                    <span className={cx('login')}>Login</span>
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
