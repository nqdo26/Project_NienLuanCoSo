import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Row, Col, Card, Typography, Divider, notification } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ShoppingCart.module.scss';

const cx = classNames.bind(styles);

const { Title, Text } = Typography;

const ShoppingCart = () => {
    const [items, setItems] = useState([]);

    // Hàm để lấy sản phẩm từ localStorage
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setItems(savedItems);
    }, []);

    const updateQuantity = (id, quantity) => {
        const updatedItems = items.map((item) => (item.id === id ? { ...item, quantity } : item));
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Cập nhật localStorage
    };

    const removeItem = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Cập nhật localStorage

        notification.success({
            message: 'Success',
            description: 'Item removed from your bag.',
            placement: 'topRight',
        });
    };

    const total = items.reduce((sum, item) => sum + item.priceNew * item.quantity, 0);

    return (
        <Row className={cx('shopping-cart')} gutter={16}>
            <Col span={16}>
                <Title level={2}>Bag</Title>
                {items.length === 0 ? (
                    <p className={cx('no-item')}>Your bag is empty.</p>
                ) : (
                    <div>
                        {items.map((item) => (
                            <Card key={item.id} className={cx('cart-item')} bordered={false}>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <img src={item.imgSrc} alt={item.title} className={cx('item-image')} />
                                    </Col>
                                    <Col span={18}>
                                        <div className={cx('title-shopping-card')}>
                                            <Title level={4}>{item.title}</Title>
                                            <div className={cx('price')}>
                                                <Text className={cx('price-old')}>
                                                    {item.priceOld ? `${item.priceOld.toLocaleString()}đ` : ''}
                                                </Text>
                                                <Text className={cx('price-new')}>
                                                    {item.priceNew.toLocaleString()}đ
                                                </Text>
                                            </div>
                                        </div>
                                        <Text type="secondary">{item.color}</Text>
                                        <div className={cx('item-info')}>
                                            <Text>Size: {item.size}</Text>
                                        </div>
                                        <div className={cx('item-controls')}>
                                            <Button onClick={() => removeItem(item.id)} icon={<DeleteOutlined />} />
                                            <InputNumber
                                                min={1}
                                                max={10}
                                                value={item.quantity}
                                                onChange={(value) => updateQuantity(item.id, value)} // Cập nhật số lượng
                                            />
                                            <Button icon={<HeartOutlined />} />
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </div>
                )}
            </Col>
            <Col span={8}>
                <Title level={3}>Summary</Title>
                <div className={cx('summary-item')}>
                    <Text>Subtotal</Text>
                    <Text>{total.toLocaleString()}đ</Text>
                </div>
                <div className={cx('summary-item')}>
                    <Text>Estimated Delivery & Handling</Text>
                    <Text>Free</Text>
                </div>
                <Divider />
                <div className={cx('summary-total')}>
                    <Text strong>Total</Text>
                    <Text strong>{total.toLocaleString()}đ</Text>
                </div>
                <Divider />
                <Button type="primary" size="large" block>
                    Member Checkout
                </Button>
            </Col>
        </Row>
    );
};

export default ShoppingCart;
