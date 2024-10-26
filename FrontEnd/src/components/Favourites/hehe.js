import React, { useState } from 'react';
import { Carousel, Button } from 'antd'; // Import Button từ antd
import { LeftOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Favourites.module.scss';
import { Card, Typography } from 'antd';

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

const Favourites = () => {
    const { Title, Text } = Typography;
    const [favourites, setFavourites] = useState([
        {
            id: 1,
            title: 'Nike Air Force 1 Dance',
            text: "Women's Shoes",
            price: '3,829,000₫',
            imgSrc: 'https://link-to-nike-af1.jpg',
        },
        {
            id: 2,
            title: 'Nike Metcon 9 AMP',
            text: "Men's Workout Shoes",
            price: '4,109,000₫',
            imgSrc: 'https://link-to-nike-metcon-9.jpg',
        },                                                                                      
    ]);

    const removeFavourite = (id) => {
        setFavourites(favourites.filter((item) => item.id !== id));
    };

    return (
        <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
            <h2 className={cx('title')}>Favourites</h2>
            <div className={cx('card-list')}>
                {favourites.length === 0 ? (
                    <p className={cx('no-item')} >Items added to your Favourites will be saved here.</p>
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
                        {favourites.map((item) => (
                            <div key={item.id} className={cx('card-cover')}>
                                <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                                    <div className={cx('card-body')}>
                                        <HeartOutlined
                                            data-testid="heart-icon"
                                            className={cx('heart-icon')}
                                            onClick={() => removeFavourite(item.id)}
                                        />
                                        <div className={cx('title-card')}>
                                            <Title
                                                style={{
                                                    margin: '0px',
                                                    fontSize: '16px',
                                                }}
                                                level={5}
                                            >
                                                {item.title}
                                            </Title>
                                            <Title level={5}>{item.price}</Title>
                                        </div>
                                        <Text type="secondary">{item.text}</Text>
                                        <br />
                                        <Button type="primary" style={{ marginTop: '10px' }}>
                                            Add To Bag
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
        </div>
    );
};

export default Favourites;