import React, { useState, useEffect, useContext } from 'react';
import { Button, InputNumber, Row, Col, Card, Typography, Divider, notification, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getListBagApi, deleteBagApi } from '../../utils/api';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ShoppingCart.module.scss';
import { ShoesContext } from '../Context/shoes.context';

const cx = classNames.bind(styles);

const { Title, Text } = Typography;

const ShoppingCart = () => {
    const { email } = useParams();
    const { appLoading, setAppLoading } = useContext(ShoesContext);
    const [totalPrice, setTotalPrice] = useState(0);    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [feeDelivery, setFeeDelivery] = useState(0);
    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    useEffect(() => {
        const fetchBags = async () => {
            setAppLoading(true);
            try {
                const response = await getListBagApi(email);
                if (response) {
                    setItems(response);
                    const newTotal = response.reduce((sum, item) => sum + item.price * item.number, 0);
                    setTotalPrice(newTotal);
                }
            } catch (error) {
                console.error('Error fetching bag:', error);
            } finally {
                setAppLoading(false);
            }
        };
        fetchBags();
    }, [email, setAppLoading]);

    useEffect(() => {
        if (totalPrice < 5000000) {
            setFeeDelivery(30000);
        } else {
            setFeeDelivery(0);
        }
    }, [totalPrice]);

    const handleRemove = async (_id) => {
        setLoading(true); 
        try {
            const response = await deleteBagApi(_id);
            if (response.EC === 0) {
                notification.success({
                    message: 'Success',
                    description: 'The product has been successfully removed from your bag.',
                });
                const updatedItems = items.filter((bag) => bag._id !== _id);
                setItems(updatedItems);

                const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.number, 0);
                setTotalPrice(newTotalPrice);
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.EM || 'An error occurred.',
                });
            }
        } catch (error) {
            console.error('Error deleting bag:', error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while removing the product from bag.',
            });
        } finally {
            setLoading(false); 
        }
    };

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = items.map(item => {
            if (item._id === id) {
                return { ...item, number: newQuantity };
            }
            return item;
        });
        setItems(updatedItems);
        const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.number, 0);
        setTotalPrice(newTotalPrice);
    };

    return (
        <Row className={cx('shopping-cart')} gutter={16}>
            <Col span={16}>
                <Title level={2}>Bag</Title>
                <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
                    {appLoading ? (
                        <div className={cx('spin-wrapper')}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <Spin size="large" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {items.length === 0 ? (
                                <p>No items in your cart.</p>
                            ) : (
                                items.map((item) => (
                                    <Card key={item.id} className={cx('cart-item')} bordered={false}>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <img src={item.image} alt={item.title} className={cx('item-image')} />
                                            </Col>
                                            <Col span={18}>
                                                <div className={cx('title-shopping-card')}>
                                                    <Title level={4}>{item.title}</Title>
                                                    <div className={cx('price')}>
                                                        <Text className={cx('price-new')}>
                                                            {formatPrice(item.price)}₫
                                                        </Text>
                                                    </div>
                                                </div>
                                                <Text type="secondary">{item.color}</Text>
                                                <div className={cx('item-info')}>
                                                    <Text>Size: {item.size}</Text>
                                                </div>
                                                <div className={cx('item-controls')}>
                                                    <Button
                                                        onClick={() => {
                                                            handleRemove(item._id);
                                                        }}
                                                        icon={<DeleteOutlined />}
                                                        loading={loading} 
                                                    />
                                                  <InputNumber
                                                        min={1}
                                                        max={10}
                                                        value={item.number}
                                                        onChange={(newQuantity) => handleQuantityChange(item._id, newQuantity)}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))
                            )}
                        </>
                    )}
                </div>
            </Col>
            <Col span={8}>
                <Title level={3}>Summary</Title>
                <div className={cx('summary-item')}>
                    <Text>Subtotal</Text>
                    <Text strong> {formatPrice(totalPrice)}₫</Text>
                </div>
                <div className={cx('summary-item')}>
                    <Text>Estimated Delivery & Handling</Text>
                    <Text>{formatPrice(feeDelivery)}₫</Text>
                </div>
                <Divider />
                <div className={cx('summary-total')}>
                    <Text strong>Total</Text>
                    <Text strong> {formatPrice(totalPrice + feeDelivery)}₫</Text>
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
