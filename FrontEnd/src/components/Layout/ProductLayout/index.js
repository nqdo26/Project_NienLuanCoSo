import React from 'react';
import { Layout, Menu, Card, Col, Row, Typography, Checkbox, Collapse } from 'antd';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import classNames from 'classnames/bind';
import styles from './ProductLayout.module.scss';
const cx = classNames.bind(styles);

function ProductLayout() {
    const { Sider, Content } = Layout;
    const { Title, Text } = Typography;
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
                            Shoes (904)
                        </Title>
                        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderLeft: '1px solid #d9d9d9' }}>
                            <Menu.Item key="1">Best Seller</Menu.Item>
                            <Menu.Item key="2">Jordan</Menu.Item>
                            <Menu.Item key="2">Nike</Menu.Item>
                            <Menu.Item key="3">Running</Menu.Item>
                            <Menu.Item key="6">Training & Gym</Menu.Item>
                            <Menu.Item key="10">Athletics</Menu.Item>
                            <Menu.Item key="11">Walking</Menu.Item>
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
                                {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'].map((size) => (
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
                        <Content style={{ padding: '20px' }}>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                        <Title level={5}>Air Jordan 1</Title>
                                        <Text type="secondary">Shoes</Text>
                                        <br />
                                        <Text>4,539,000đ</Text>
                                        <br />
                                        <Text type="danger">20% off</Text>
                                        <br />
                                        <Text strong>3,631,199đ</Text>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                        <Title level={5}>Air Jordan 1</Title>
                                        <Text type="secondary">Shoes</Text>
                                        <br />
                                        <Text>4,539,000đ</Text>
                                        <br />
                                        <Text type="danger">20% off</Text>
                                        <br />
                                        <Text strong>3,631,199đ</Text>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                        <Title level={5}>Air Jordan 1</Title>
                                        <Text type="secondary">Shoes</Text>
                                        <br />
                                        <Text>4,539,000đ</Text>
                                        <br />
                                        <Text type="danger">20% off</Text>
                                        <br />
                                        <Text strong>3,631,199đ</Text>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                        <Title level={5}>Air Jordan 1</Title>
                                        <Text type="secondary">Shoes</Text>
                                        <br />
                                        <Text>4,539,000đ</Text>
                                        <br />
                                        <Text type="danger">20% off</Text>
                                        <br />
                                        <Text strong>3,631,199đ</Text>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                        <Title level={5}>Air Jordan 1 Elevate Low</Title>
                                        <Text type="secondary">Shoes</Text>
                                        <br />
                                        <Text>3,829,000đ</Text>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                        <Title level={5}>Nike Dunk Low</Title>
                                        <Text type="secondary">Women's Shoes</Text>
                                        <br />
                                        <Text>2,929,000đ</Text>
                                    </Card>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </div>
            <Footer />
        </>
    );
}

export default ProductLayout;
