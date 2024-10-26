import React from 'react';
import classNames from 'classnames/bind';
import CardList from '../../components/CardList';
import styles from './Favourite.module.scss';
import Favourites from '../../components/Favourites';


const cx = classNames.bind(styles);

function Favourite() {
    const titleCardList = 'Find Your Next Favourites';

    return (
        <div className={cx('inner')}>
            <Favourites />
            <div className={cx('divider')}></div>
            <CardList title={titleCardList} />
            <div className={cx('divider')}></div>
        </div>
    );
}

export default Favourite;
