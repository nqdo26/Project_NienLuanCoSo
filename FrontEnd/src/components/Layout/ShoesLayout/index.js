import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import classNames from 'classnames/bind';
import styles from './ShoesLayout.module.scss';
import React from 'react';

import CardList from '~/components/CardList';

const cx = classNames.bind(styles);

function ShoesLayout({ children }) {
    const title = 'You may also like';
    return (
        <>
            <Header />
            <div className={cx('body')}>
                {children}
                <div className={cx('like')}>
                    <CardList title={title} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ShoesLayout;
