import React from 'react';
import { Carousel as CarouselCustome } from 'antd';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

const contentStyle = {
  height: '900px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselCustomize = () => (
  <CarouselCustome autoplay>
    <div className={cx('carousel-items')}>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div className={cx('carousel-items')}>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div className={cx('carousel-items')}>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div className={cx('carousel-items')}>
      <h3 style={contentStyle}>4</h3>
    </div>
  </CarouselCustome>
);

export default CarouselCustomize;