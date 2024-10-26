import React from 'react';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './SearchInHeader.module.scss';

const cx = classNames.bind(styles);

function SearchInHeader() {

return (
            <div className={cx('search')}>
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} >
                    <SearchIcon />
                </button>
                <input className={cx('search-input')} placeholder='Search'>
                </input>
            </div>

    );
}

export default SearchInHeader;