import React, { useContext, useEffect, useState } from 'react';
import { Carousel, notification, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Favourites.module.scss';
import { deleteFavouriteApi, getListFavourtiteApi } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoesContext } from '../Context/shoes.context';
import CardProductFavourite from '../CardProductFavourite';

const cx = classNames.bind(styles);

const Favourites = () => {
    const { email } = useParams();
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(false); 
    const { appLoading, setAppLoading } = useContext(ShoesContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavourites = async () => {
            setAppLoading(true);
            try {
                const response = await getListFavourtiteApi(email);
                if (response) {
                    setFavourites(response);
                }
            } catch (error) {
                console.error('Error fetching favourites:', error);
            } finally {
                setAppLoading(false);
            }
        };
        fetchFavourites();
    }, [email, setAppLoading]);

    const onClickRemoveFavourite = async (_id) => {
        setLoading(true); // Bắt đầu loading khi xoá
        try {
            const response = await deleteFavouriteApi(_id);
            if (response.EC === 0) {
                notification.success({
                    message: 'Success',
                    description: 'The product has been successfully removed from your favourites.',
                });
                setFavourites(favourites.filter((fav) => fav._id !== _id));
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.EM || 'An error occurred.',
                });
            }
        } catch (error) {
            console.error('Error deleting favourite:', error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while removing the product from favourites.',
            });
        } finally {
            setLoading(false); 
        }
    };

    const CustomArrow = ({ className, style, onClick, icon }) => (
        <div
            className={className}
            style={{
                ...style,
                fontSize: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'black',
                zIndex: 10,
            }}
            onClick={onClick}
        >
            {icon}
        </div>
    );

    return (
        <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
            {appLoading ? (
                <div className={cx('spin-wrapper')}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Spin size="large" />
                    </div>
                </div>
            ) : (
                <>
                    <h2 className={cx('title')}>Favourites</h2>
                    <div className={cx('card-list')}>
                        {favourites.length === 0 ? (
                            <p className={cx('no-item')}>Items added to your Favourites will be saved here.</p>
                        ) : (
                            <Carousel
                                className={cx('carousel-wrapper')}
                                slidesToShow={4}
                                slidesToScroll={1}
                                arrows
                                prevArrow={<CustomArrow icon={<LeftOutlined style={{ marginLeft: '20px' }} />} />}
                                nextArrow={<CustomArrow icon={<RightOutlined style={{ marginRight: '20px' }} />} />}
                                style={{ paddingBottom: '30px' }}
                            >
                                {favourites.length > 0 &&
                                    favourites.map((item) => (
                                        <div
                                            key={item._id}
                                            className={cx('card-cover')}
                                            onClick={() => navigate(`/productmanage/${item.shoesId}`)}
                                        >
                                            <CardProductFavourite
                                                className={cx('card')}
                                                hoverable
                                                cover={
                                                    <img
                                                        alt={item.title || 'Product Image'}
                                                        src={item.imageUrl || 'default-image-url'}
                                                        style={{ height: '200px', objectFit: 'contain' }}
                                                    />
                                                }
                                                title={item.title}
                                                text={item.tag}
                                                numberOfColors={item.numberOfColors}
                                                price={item.price}
                                                onClick={() => {
                                                    onClickRemoveFavourite(item._id);
                                                }}
                                            />
                                            {loading && (
                                                <Spin
                                                    size="large"
                                                    style={{
                                                        position: 'fixed',
                                                        top: '45%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        zIndex: 1000, 
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}

                                {Array.from({ length: 4 - favourites.length }).map((_, index) => (
                                    <div key={`placeholder-${index}`} className={cx('card-cover')} />
                                ))}
                            </Carousel>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Favourites;
