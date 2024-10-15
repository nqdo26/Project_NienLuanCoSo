import React from 'react';
import classNames from 'classnames/bind';
import CarouselCustomize from '../../components/Carousel';
import styles from './Home.module.scss';
import RunningBanner from '../../components/RunningBanner';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('inner')}>
      
            <div className={cx('carousel')}><CarouselCustomize /></div>
           <RunningBanner />
       
        </div>
       
    );
}

export default Home;
