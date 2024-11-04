import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Favourites.module.scss';
import { Card, Typography } from 'antd';

const cx = classNames.bind(styles);

const Favourites = () => {
    const { Title, Text } = Typography;
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(storedFavourites);
    }, []);

    const removeFavourite = (id) => {
        const updatedFavourites = favourites.filter((item) => item.id !== id);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    return (
        <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
            <h2 className={cx('title')}>Favourites</h2>
            <div className={cx('card-list')}>
                {favourites.length === 0 ? (
                    <p className={cx('no-item')}>Items added to your Favourites will be saved here.</p>
                ) : (
                    <Carousel
                        className={cx('carousel-wrapper')}
                        slidesToShow={4}
                        slidesToScroll={1}
                        arrows
                        prevArrow={<LeftOutlined style={{ fontSize: '24px', color: 'black' }} />}
                        nextArrow={<RightOutlined style={{ fontSize: '24px', color: 'black' }} />}
                        style={{ paddingBottom: '30px' }}
                    >
                        {favourites.map((item) => (
                            <div key={item.id} className={cx('card-cover')}>
                                <Card
                                    hoverable
                                    cover={<img alt="example" src={item.imgSrc || 'https://via.placeholder.com/240'} />}
                                >
                                    <div className={cx('card-body')}>
                                        <HeartOutlined
                                            className={cx('heart-icon')}
                                            onClick={() => removeFavourite(item.id)}
                                        />
                                      <div clasName={cx('card-items')}>
                                            <div className={cx('title-card')}>
                                                <Title style={{ margin: '0px', fontSize: '16px' }} level={5}>
                                                    {item.title}
                                                </Title>
                                                <Title level={5}>{item.price}₫</Title>
                                            </div>
                                            <Text className={cx('decription-card')} type="secondary">{item.description}</Text>
                                            <br />
                                            <Button type="primary" style={{ marginTop: '10px' }}>
                                                Add To Bag
                                            </Button>
                                      </div>
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
