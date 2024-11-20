import React, { useContext, useEffect, useState } from 'react';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { ShoesContext } from '../../components/Context/shoes.context';
import CardProductManage from '~/components/CardProductManage';

const cx = classNames.bind(styles);

function Search() {    
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [product, setProduct] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                // Lấy dữ liệu từ state thay vì từ query params
                const searchData = location.state?.data;
                console.log('>>> searchData:', searchData);
                if (searchData && Array.isArray(searchData)) {
                    setProduct(searchData);
                    setShoes(searchData);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setAppLoading(false);
            }
        };
    
        fetchShoes();
    }, [location.state?.data, setAppLoading, setShoes]);
    

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
                       <p>No product found</p>
                    ) : (
                        <div className={cx('item')}>
                            {product.map((item) => (
                                <Link to={`/productmanage/${item._id}`} key={item._id}>
                                    <div key={item._id} className={cx('card-cover')}>
                                        <CardProductManage
                                            images={item.images}    
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

export default Search;
