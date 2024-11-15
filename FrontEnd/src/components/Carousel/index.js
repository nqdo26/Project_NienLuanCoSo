import React from 'react';
import { Carousel as CarouselCustome } from 'antd';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

const contentStyle1 = {
  height: '950px',
  backgroundImage: `url(${require('~/assets/images/carousel/carousel-img-1.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const contentStyle2 = {
  height: '950px',
  backgroundImage: `url(${require('~/assets/images/carousel/carousel-img-4.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const contentStyle3 = {
  height: '950px',
  backgroundImage: `url(${require('~/assets/images/carousel/carousel-img-3.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const contentStyle4 = {
  height: '950px',
  backgroundImage: `url(${require('~/assets/images/carousel/carousel-img-2.jpg')})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const CarouselCustomize = () => (
  <CarouselCustome autoplay autoplaySpeed={3000} infinite pauseOnHover={false}>
    <div className={cx('carousel-items')}>
      <div style={contentStyle1}></div>
    </div>
    <div className={cx('carousel-items')}>
      <div style={contentStyle2}></div>
    </div>
    <div className={cx('carousel-items')}>
      <div style={contentStyle3}></div>
    </div>
    <div className={cx('carousel-items')}>
      <div style={contentStyle4}></div>
    </div>
  </CarouselCustome>
);

export default CarouselCustomize;