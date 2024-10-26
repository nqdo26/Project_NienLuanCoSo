import React, { useState } from 'react';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import SearchForm from './SearchMenu'; 

const cx = classNames.bind(styles);

function Search() {
    const [showResult, setShowResult] = useState(false);

    const handleFocus = () => {
        setShowResult(true);
    };

    const handleBlur = () => {
        setShowResult(false);
    };

    return (
        <>
            <div className={cx('overlay', { show: showResult })} onClick={handleBlur}>
                <div className={cx('menu')} onClick={(e) => e.stopPropagation()}>
                    <SearchForm setShowResult={setShowResult} /> 
                </div>
            </div>
            <div className={cx('search')} onClick={handleFocus}>
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} >
                    <SearchIcon />
                </button>
                <p className={cx('search-input')} tabIndex="0">
                    Search
                </p>
            </div>
        </>
    );
}

export default Search;