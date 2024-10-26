import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

function Products({ isVisible, onMouseLeave }) {
    return (
        <>
            {isVisible && (
                <div className={cx('overlay')} onMouseLeave={onMouseLeave}>
                    <div className={cx('menu')}>
                        <Link to="#">
                        <div className={cx('items-wrapper')}>
                            <div className={cx('items')}>
                                <p className={cx('title')}>Featured</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>

                                <div className={cx('divider-items')}></div>

                                <p className={cx('title')}>Jordan</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Shoes</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>

                                <div className={cx('divider-items')}></div>

                                <p className={cx('title')}>Nike</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Accessories and Equipment</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Shop By Brand</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                                <p className={cx('content')}>Air Max</p>

                                <div className={cx('divider-items')}></div>

                                <p className={cx('title')}>Shop By Sport</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                                <p className={cx('content')}>Air Max</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            )}
            <div className={cx('nav-items')}>
                <Link to='/products' className={cx('nav-content')} onMouseDown={(e) => e.preventDefault()}>
                    Products
                </Link>
            </div>
        </>
    );
}

export default Products;