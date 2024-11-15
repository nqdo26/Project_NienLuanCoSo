import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Dropdown, Space } from 'antd';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FarvoriteIcon, CartIcon } from '~/components/Icons';
import Search from '~/components/Search';
import NavMenu from '~/components/NavMenu';
import { UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    //  console.log('>>Check auth', auth);
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
        ...(auth.user.role === 'ADMIN'
            ? [
                  {
                      key: '7',
                      label: (
                          <Link className={cx('admin-content')} to="/user">
                              <span className={cx('content')}>Account Management</span>
                          </Link>
                      ),
                  },
                  {
                      key: '8',
                      label: (
                          <Link className={cx('admin-content')} to="/productmanage">
                              <span className={cx('content')}>Product Management</span>
                          </Link>
                      ),
                  },
                  {
                      key: '9',
                      label: (
                          <Link className={cx('admin-content')} to="/product">
                              <span className={cx('content')}>Sale Management</span>
                          </Link>
                      ),
                  },
              ]
            : []),

        {
            key: '10',
            label: (
                <span
                    onClick={() => {
                        localStorage.clear('access_token');
                        setAuth({
                            isAuthenticated: false,
                            user: {
                                email: '',
                                name: '',
                                role: '',
                            },
                        });
                        navigate('/');
                    }}
                    className={cx('content')}
                >
                    Log out
                </span>
            ),
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-1')}>
                    <div className={cx('header-1-inner')}>
                        <div className={cx('header-1-item')}>
                            <Link to="/" className={cx('header-1-link')}>
                                <span className={cx('header-1-content-1')}>Find a Store</span>
                            </Link>
                            <Link to="/" className={cx('header-1-link')}>
                                <span className={cx('header-1-content')}>Help</span>
                            </Link>
                            {!auth.isAuthenticated ? (
                                // No Login
                                <Link to="/login" className={cx('header-1-link')}>
                                    <span className={cx('header-1-content')}>Log In</span>
                                </Link>
                            ) : (
                                // Yes Login
                                <div className={cx('header-1-account-option')}>
                                    <span className={cx('header-1-content')}>
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
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('header-2')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img src={images.logo} alt="Nike" />
                    </Link>

                    <div className={cx('nav')}>
                        <NavMenu />
                    </div>

                    <div className={cx('actions')}>
                        <>
                            <Search />

                            <Tippy clasName={cx('number-btn')} delay={[500, 50]} content="Favorites" placement="bottom">
                                <Link to={`/favourite/${auth.user.email}`}>
                                    <Badge offset={[-6, 7]} className={cx('custom-badge')}>
                                        <button className={cx('action-btn')}>
                                            <FarvoriteIcon />
                                        </button>
                                    </Badge>
                                </Link>
                            </Tippy>
                            <Tippy clasName={cx('number-btn')} delay={[500, 50]} content="Bag" placement="bottom">
                            <Link to={`/bag/${auth.user.email}`}>
                                    <Badge offset={[-6, 7]} className={cx('custom-badge')}>
                                        <button className={cx('action-btn')}>
                                            <CartIcon />
                                        </button>
                                    </Badge>
                                </Link>
                            </Tippy>
                        </>
                    </div>
                </div>
                <div className={cx('header-3')}>
                    <div className={cx('header-3-inner')}>
                        <span className={cx('header-3-content')}>Free Standard Delivery & 30-Day Free Returns</span>
                        <Link to="/" className={cx('header-3-link')}>
                            Join Now View Details
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
