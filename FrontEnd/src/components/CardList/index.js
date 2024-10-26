import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardList.module.scss';
import CardProduct from '../CardProduct';

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
    return (
        <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('card-list')}>
                <Carousel
                    className={cx('carousel-wrapper')}
                    slidesToShow={4}
                    slidesToScroll={1}
                    arrows
                    prevArrow={<CustomArrow icon={<LeftOutlined style={{ marginLeft: '20px' }} />} />}
                    nextArrow={<CustomArrow icon={<RightOutlined style={{ marginRight: '20px' }} />} />}
                    style={{ paddingBottom: '30px' }}
                >
                    <div className={cx('card-cover')}>
                        <CardProduct
                            className={cx('card')}
                            hoverable
                            cover={
                                <img
                                    alt="Nike Air Force 1 Dance"
                                    src="https://link-to-nike-af1.jpg"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            }
                            title="Nike Air Force 1 Dance"
                            text="Women's Shoes"
                            price="3,829,000₫"
                        />
                    </div>
                    <div className={cx('card-cover')}>
                        <CardProduct
                            className={cx('card')}
                            hoverable
                            cover={
                                <img
                                    alt="Nike Metcon 9 AMP"
                                    src="https://link-to-nike-metcon-9.jpg"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            }
                            title="Nike Metcon 9 AMP"
                            text="Men's Workout Shoes"
                            price="4,109,000₫"
                        />
                    </div>
                    <div className={cx('card-cover')}>
                        <CardProduct
                            className={cx('card')}
                            hoverable
                            cover={
                                <img
                                    alt="Nike Free Metcon 6 Premium"
                                    src="https://link-to-nike-metcon-6.jpg"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            }
                            title="Nike Free Metcon 6 Premium"
                            text="Women's Workout Shoes"
                            price="3,829,000₫"
                        />
                    </div>
                    <div className={cx('card-cover')}>
                        <CardProduct
                            className={cx('card')}
                            hoverable
                            cover={
                                <img
                                    alt="Nike Free Metcon 6 Premium"
                                    src="https://link-to-nike-metcon-6.jpg"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            }
                            title="Nike Free Metcon 6 Premium"
                            text="Women's Workout Shoes"
                            price="3,829,000₫"
                        />
                    </div>
                    <div className={cx('card-cover')}>
                        <CardProduct
                            className={cx('card')}
                            hoverable
                            cover={
                                <img
                                    alt="Nike Free Metcon 6 Premium"
                                    src="https://link-to-nike-metcon-6.jpg"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            }
                            title="Nike Free Metcon 6 Premium"
                            text="Women's Workout Shoes"
                            price="3,829,000₫"
                        />
                    </div>
                    <div className={cx('card-cover')}>
                        <CardProduct
                            className={cx('card')}
                            hoverable
                            cover={
                                <img
                                    alt="Nike Free Metcon 6 Premium"
                                    src="https://link-to-nike-metcon-6.jpg"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            }
                            title="Nike Free Metcon 6 Premium"
                            text="Women's Workout Shoes"
                            price="3,829,000₫"
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default CardList;
