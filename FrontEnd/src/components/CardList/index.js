import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardList.module.scss';
import CardProduct from '../CardProduct';
import { Spin } from 'antd';
import { getShoesByTypeApi } from '../../utils/api';
import { ShoesContext } from '../../components/Context/shoes.context';

const cx = classNames.bind(styles);

const CustomArrow = ({ className, style, onClick, icon }) => (
    <div
        className={className}
        style={{
            ...style,
            fontSize: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'black',
            zIndex: 10,
        }}
        onClick={onClick}
    >
        {icon}
    </div>
);

const CardList = ({ title }) => {
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const res = await getShoesByTypeApi('nike');
                if (res && Array.isArray(res.data)) {
                    setProduct(res.data);
                    setShoes(res.data);
                }
                if (res.data.length === 0) {
                    setError('No product.');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error.');
            } finally {
                setAppLoading(false);
            }
        };

        fetchShoes();
    }, [setAppLoading, setShoes]);

    return (
        <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('card-list')}>
                {appLoading ? (
                    <Spin size="large" />
                ) : error ? (
                    <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                ) : (
                    <Carousel
                        className={cx('carousel-wrapper')}
                        slidesToShow={4}
                        slidesToScroll={1}
                        arrows
                        prevArrow={<CustomArrow icon={<LeftOutlined style={{ marginLeft: '20px' }} />} />}
                        nextArrow={<CustomArrow icon={<RightOutlined style={{ marginRight: '20px' }} />} />}
                        style={{ paddingBottom: '30px' }}
                    >
                        {product.map((item) => (
                            <div className={cx('card-cover')} key={item._id}>
                                <CardProduct
                                    className={cx('card')}
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.title}
                                            src={item.imageUrl}
                                            style={{ height: '200px', objectFit: 'contain' }}
                                        />
                                    }
                                    title={item.title}
                                    text={item.description}
                                    price={item.price}
                                />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
        </div>
    );
};

export default CardList;