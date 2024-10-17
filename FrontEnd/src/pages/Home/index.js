import React from 'react';
import classNames from 'classnames/bind';
import CarouselCustomize from '../../components/Carousel';
import styles from './Home.module.scss';
import RunningBanner from '../../components/RunningBanner';
import FeaturedSection from '../../components/FeaturedSection';
import SeeWhatIsNew from '../../components/SeeWhatIsNew';
import CustomMenu from '../../components/CustomMenu';

const cx = classNames.bind(styles);


function Home() {
    return (
        <div className={cx('inner')}>
      
            <div className={cx('carousel')}><CarouselCustomize /></div>
           <RunningBanner />
           <div className={cx('divider-1')}></div>
           <FeaturedSection />
           <div className={cx('divider')}></div>
           <SeeWhatIsNew />
           <div className={cx('divider')}></div>
           <CustomMenu />
           <div className={cx('divider')}></div>
        </div>
       
    );
}

export default Home;
