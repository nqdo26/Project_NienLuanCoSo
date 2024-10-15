import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SNKRS.module.scss';

const cx = classNames.bind(styles);

function SNKRS() {
    return (
        <div className={cx('nav-items')}>
            <Link className={cx('nav-content')} onMouseDown={(e) => e.preventDefault()}>
                SNKRS
            </Link>
        </div>
    );
}

export default SNKRS;
