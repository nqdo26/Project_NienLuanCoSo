import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchForm.module.scss';
import SearchHeader from '../SearchHeader'; 

const cx = classNames.bind(styles);

function SearchForm({ setShowResult }) {
    return (
        <div className={cx('inner')}>
            <div className={cx('header')}>
                <SearchHeader setShowResult={setShowResult} /> 
            </div>
            <div className={cx('content')}>
                <div className={cx('items')}>
                    <p className={cx('title')}>Popular Search Terms</p>
                    <p className={cx('popular-search-terms')}>Air Force 1</p>
                    <p className={cx('popular-search-terms')}>Jordan</p>
                    <p className={cx('popular-search-terms')}>Air Max</p>
                    <p className={cx('popular-search-terms')}>Blazer</p>
                </div>
            </div>
        </div>
    );
}

export default SearchForm;