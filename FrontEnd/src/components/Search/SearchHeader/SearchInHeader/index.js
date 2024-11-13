import React, { useState } from 'react';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './SearchInHeader.module.scss';
import { searchShoesApi } from '~/utils/api';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd'; 

const cx = classNames.bind(styles);

function SearchInHeader() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true); 
        try {
            const response = await searchShoesApi(searchTerm);
            if (response) {
                navigate('/search', { state: { data: response.data } });
            } else {
                console.log(">>> data not found");
            }
        } catch (error) {
            console.error('Error during search', error);
        } finally {
            setLoading(false); 
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
            {loading && (  
                <div className={cx('loading-spinner')}>
                    <Spin size="large" /> 
                </div>
            )}
        </div>
    );
}

export default SearchInHeader;
