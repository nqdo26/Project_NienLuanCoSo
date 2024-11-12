import React, { useState } from 'react';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './SearchInHeader.module.scss';
import { searchShoesApi } from '~/utils/api';

const cx = classNames.bind(styles);

function SearchInHeader() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const response = await searchShoesApi(searchTerm);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cx('search')}>
            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={handleSearch}>
                <SearchIcon />
            </button>
            <input
                className={cx('search-input')}
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default SearchInHeader;