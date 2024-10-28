import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductManage.module.scss';

import CardProductManage from '~/components/CardProductManage';
import CardAddProduct from '../../components/CardAddProduct';

const cx = classNames.bind(styles);

function ProductManage() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const items = [
            { id: 1, title: 'Nike Air Force 1', text: 'Dance version', color: 'White', price: '$120' },
            { id: 2, title: 'Nike Metcon 9 AMP', text: 'AMP version', color: 'Black', price: '$130' },
            { id: 3, title: 'Adidas Ultraboost', text: 'Running shoes', color: 'Blue', price: '$140' },
            { id: 4, title: 'Nike Air Force 2', text: 'Dance version', color: 'White', price: '$120' },
            { id: 5, title: 'Nike Metcon 8 AMP', text: 'AMP version', color: 'Black', price: '$130' },
        ];

        setProduct(items);
    }, []);

    const handleDelete = (id) => {
        setProduct((prevProduct) => prevProduct.filter((item) => item.id !== id));
    };

    return (
        <div className={cx('wrapper')}>
            {product.length === 0 ? (
                <CardAddProduct />
            ) : (
                <div className={cx('item')}>
                    {product.map((item) => (
                        <div key={item.id} className={cx('card-cover')}>
                            <CardProductManage
                                title={item.title}
                                text={item.text}
                                color={item.color}
                                price={item.price}
                                onDelete={() => handleDelete(item.id)}
                            />
                        </div>
                    ))}
                    <CardAddProduct />
                </div>
            )}
        </div>
    );
}

export default ProductManage;
