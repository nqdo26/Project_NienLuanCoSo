import React from 'react';
import { Layout, Menu, Typography, Checkbox, Collapse } from 'antd';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import classNames from 'classnames/bind';
import styles from './ProductsLayout.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ProductLayout({ children, key }) {
    const { Sider, Content } = Layout;
    const { Title } = Typography;
    const { Panel } = Collapse;

    const colors = [
        { name: 'Black', colorCode: '#000000' },
        { name: 'Blue', colorCode: '#1E90FF' },
        { name: 'Brown', colorCode: '#8B4513' },
        { name: 'Green', colorCode: '#32CD32' },
        { name: 'Grey', colorCode: '#808080' },
        { name: 'Orange', colorCode: '#FFA500' },
        { name: 'Pink', colorCode: '#FF69B4' },
        { name: 'Purple', colorCode: '#800080' },
        { name: 'Red', colorCode: '#FF0000' },
        { name: 'White', colorCode: '#FFFFFF', border: '1px solid #000' },
        { name: 'Yellow', colorCode: '#FFD700' },
    ];

    return (
        <>
            <Header />
            <div className={cx('body')}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider width={300} style={{ background: '#fff', padding: '20px' }}>
                        <Title level={4} style={{ marginBottom: '20px' }}>
                            Filter
                        </Title>
                        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderLeft: '1px solid #d9d9d9' }}>
                            <Menu.Item value="all" key="1">
                                <Link to="/products">All Shoes</Link>
                            </Menu.Item>
                            <Menu.Item value="jordan" key="2">
                                <Link to="/products/jordan">Jordan</Link>
                            </Menu.Item>
                            <Menu.Item value="nike" key="3">
                                <Link to="/products/nike">Nike</Link>
                            </Menu.Item>
                            <Menu.Item value="running" key="4">
                                <Link to="/products/running">Running</Link>
                            </Menu.Item>
                            <Menu.Item value="trainingandgym" key="5">
                                <Link to="/products/trainingandgym">Training&Gym</Link>
                            </Menu.Item>
                            <Menu.Item value="athletics" key="6">
                                <Link to="/products/athletics">Athletics</Link>
                            </Menu.Item>
                            <Menu.Item value="walking" key="7">
                                <Link to="/products/walking">Walking</Link>
                            </Menu.Item>
                        </Menu>

                        <Collapse bordered={false} defaultActiveKey={['1']} style={{ marginTop: '20px' }}>
                            <Panel header="Gender (2)" key="1">
                                <Checkbox>Men</Checkbox>
                                <Checkbox>Women</Checkbox>
                            </Panel>
                            <Panel header="Shop By Price" key="2">
                                <Checkbox>Under 1,000,000đ</Checkbox>
                            </Panel>
                            <Panel header="Sale & Offers" key="3">
                                <Checkbox>Sale</Checkbox>
                            </Panel>
                            <Panel header="Size" key="4">
                                {[
                                    '36',
                                    '36.5',
                                    '37',
                                    '37.5',
                                    '38',
                                    '38.5',
                                    '39',
                                    '39.5',
                                    '40',
                                    '40.5',
                                    '41',
                                    '42',
                                    '43',
                                    '43',
                                    '44',
                                    '45',
                                    '46',
                                    '47',
                                ].map((size) => (
                                    <Checkbox>{size}</Checkbox>
                                ))}
                            </Panel>
                            <Panel header="Color" key="5">
                                <div className={cx('color-gird')}>
                                    {colors.map(({ name, colorCode, border }) => (
                                        <div className={cx('color-item')} key={name}>
                                            <div
                                                className={cx('color-circle')}
                                                style={{ backgroundColor: colorCode, border: border || 'none' }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </Panel>
                        </Collapse>
                    </Sider>

                    <Layout>
                        <Content style={{ padding: '20px' }}>{children}</Content>
                    </Layout>
                </Layout>
            </div>
            <Footer />
        </>
    );
}

export default ProductLayout;
