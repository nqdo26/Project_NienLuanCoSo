import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NewAndFeatured.module.scss';

const cx = classNames.bind(styles);

function NewAndFeatured({ isVisible, onMouseLeave }) {
    return (
        <>
            {isVisible && (
                <div className={cx('overlay')} onMouseLeave={onMouseLeave}>
                    <div className={cx('menu')}>
                        <div className={cx('items-wrapper')}>
                            <div className={cx('items')}>
                                <p className={cx('title')}>Popular Search Terms</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Popular Search Terms</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Popular Search Terms</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Popular Search Terms</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
    
                            <div className={cx('items')}>
                                <p className={cx('title')}>Popular Search Terms</p>
                                <p className={cx('content')}>Air Force 1</p>
                                <p className={cx('content')}>Jordan</p>
                                <p className={cx('content')}>Air Max</p>
                                <p className={cx('content')}>Blazer</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('nav-items')}>
                <Link className={cx('nav-content')} onMouseDown={(e) => e.preventDefault()}>
                    New & Featured
                </Link>
            </div>
        </>
    );
}

export default NewAndFeatured;
