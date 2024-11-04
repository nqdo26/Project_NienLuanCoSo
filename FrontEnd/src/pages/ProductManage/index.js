import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Spin } from 'antd';
import styles from './ProductManage.module.scss';
import CardProductManage from '~/components/CardProductManage';
import CardAddProduct from '../../components/CardAddProduct';
import { getListShoesApi } from '../../utils/api';
import { ShoesContext } from '../../components/Context/shoes.context';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductManage() {
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
                        <CardAddProduct />
                    ) : (
                        <div className={cx('item')}>
                            {product.map((item) => (
                                <Link to={`/productmanage/${item._id}`} key={item._id}>
                                    <div key={item._id} className={cx('card-cover')}>
                                        <CardProductManage
                                            id={item._id}
                                            title={item.title}
                                            tag={item.tag}
                                            numberOfColors={item.numberOfColors}
                                            price={item.price}
                                            onDelete={() => handleDelete(item._id)}
                                        />
                                    </div>
                                </Link>
                            ))}
                            <CardAddProduct />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ProductManage;
