import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { Link } from 'react-router-dom';
import { getListShoesApi } from '../../utils/api';
import { ShoesContext } from '../../components/Context/shoes.context';
import CardProductManage from '~/components/CardProductManage';

const cx = classNames.bind(styles);

function Products() {
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const res = await getListShoesApi();
                if (res && Array.isArray(res)) {
                    setProduct(res);
                    setShoes(res);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setAppLoading(false);
            }
        };

        fetchShoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (id) => {
        setProduct((prevProduct) => prevProduct.filter((item) => item._id !== id));
    };
    return (
        <div className={cx('wrapper')}>
            {appLoading ? (
                <div
                    style={{
                        position: 'absolute',
                        top: '65%',
                        left: '57%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    {product.length === 0 ? (
                       <p>No product</p>
                    ) : (
                        <div className={cx('item')}>
                            {product.map((item) => (
                                <Link to={`/productmanage/${item._id}`} key={item._id}>
                                    <div key={item._id} className={cx('card-cover')}>
                                        <CardProductManage
                                            title={item.title}
                                            tag={item.tag}
                                            numberOfColors={item.numberOfColors}
                                            price={item.price}
                                            onDelete={() => handleDelete(item._id)}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Products;
