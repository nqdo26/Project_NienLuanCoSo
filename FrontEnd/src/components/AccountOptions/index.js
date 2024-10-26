import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AccountOptions.module.scss';
import { AuthContext } from '../Context/auth.context';
const cx = classNames.bind(styles);

const AccountOptions = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const handleLogout = (navigate) => {
        localStorage.clear('access_token');
        setAuth({
            isAuthenticated: false,
            user: {
                name: '',
                email: '',
            },
        });
        navigate('/');
    };

    const items = [
        {
            key: '1',
            label: <span className={cx('title')}>Account</span>,
        },
        {
            key: '2',
            label: <span className={cx('content')}>Profile</span>,
        },
        {
            key: '3',
            label: <span className={cx('content')}>Orders</span>,
        },
        {
            key: '4',
            label: <span className={cx('content')}>Inbox</span>,
        },
        {
            key: '5',
            label: <span className={cx('content')}>Experiences</span>,
        },
        {
            key: '6',
            label: <span className={cx('content')}>Account Settings</span>,
        },
        {
            key: '7',
            label: (
                <Link className={cx('link')} to="/user">
                    <span className={cx('content')}>Account Management</span>
                </Link>
            ),
        },
        {
            key: '8',
            label: (
                <span onClick={() => handleLogout(navigate)} className={cx('content')}>
                    Log out
                </span>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a href="/" onClick={(e) => e.preventDefault()}>
                <Space className={cx('hi-account')}>
                    <span>Hi, {auth?.user?.name}</span>
                    <UserOutlined className={cx('icon')} />
                </Space>
            </a>
        </Dropdown>
    );
};

export default AccountOptions;
