import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CardAddProduct.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardAddProduct() {
    return (
        <Link to="/addproduct">
            <div className={cx('card-size')}>
                <Card
                    className={cx('card')}
                    hoverable
                    style={{
                        backgroundColor: '#C0C0C0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <div className={cx('icon-cover')}>
                        <PlusOutlined className={cx('icon')} />
                    </div>
                </Card>
            </div>
        </Link>
    );
}

export default CardAddProduct;
