import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { Link } from 'react-router-dom';
import { getShoesByTypeApi } from '../../utils/api';
import { ShoesContext } from '../../components/Context/shoes.context';
import CardProductManage from '~/components/CardProductManage';

const cx = classNames.bind(styles);

function Jordan() {
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(null); // Thêm state để lưu thông báo lỗi

    useEffect(() => {
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const res = await getShoesByTypeApi('jordan');
                if (res && Array.isArray(res.data)) {
                    setProduct(res.data);
                    setShoes(res.data);
                }
                if (res.data.length === 0) {
                    setError('No product.'); 
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error.'); 
            } finally {
                setAppLoading(false);
            }
        };

        fetchShoes();
    }, [setAppLoading, setShoes]);

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
            ) : error ? ( 
                <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
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
        </div>
    );
}

export default Jordan;