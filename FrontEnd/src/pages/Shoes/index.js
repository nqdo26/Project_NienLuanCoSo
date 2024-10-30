import classNames from 'classnames/bind';
import styles from './Shoes.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Radio, Image, Typography, Rate, Collapse, notification } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
import { Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { getShoesApi } from '../../utils/api';
import { ShoesContext } from '../../components/Context/shoes.context';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Text } = Typography;

const cx = classNames.bind(styles);

function Shoes() {
    const { _id } = useParams();
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [shoes, setAShoes] = useState();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const response = await getShoesApi(_id);
                console.log('>>>Data:', response.data);

                if (response && response.data) {
                    setAShoes(response.data);
                    setShoes(response.data);
                    console.log('>>>Shoes set to:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setAppLoading(false);
            }
        };

        fetchShoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id]);

    const [size, setSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [mainImage, setMainImage] = useState('https://via.placeholder.com/400x400');

    const thumbnails = [
        'https://via.placeholder.com/400x400',
        'https://via.placeholder.com/400x400/0000FF',
        'https://via.placeholder.com/400x400/FF0000',
        'https://via.placeholder.com/400x400/00FF00',
        'https://via.placeholder.com/400x400/0000FF',
        'https://via.placeholder.com/400x400/00FF12',
    ];

    const colors = [
        { name: 'Purple', colorCode: '#800080' },
        { name: 'Blue', colorCode: '#1E90FF' },
        { name: 'Green', colorCode: '#32CD32' },
    ];

    const handleChange = (e) => {
        setSize(e.target.value);
    };

    const handleColorSelect = (name) => {
        setSelectedColor(name);
    };

    const addToFavourites = () => {
        const product = {
            id: Date.now(),
            title: 'Nike Air Max SC',
            price: '2,189,000₫',
            imgSrc: mainImage,
            size: size,
            color: selectedColor,
        };

        const existingFavourites = JSON.parse(localStorage.getItem('favourites')) || [];

        const isExisting = existingFavourites.some((item) => item.title === product.title);

        if (isExisting) {
            notification.warning({
                message: 'Warning',
                description: 'This product is already in your Favourites',
                placement: 'topRight',
            });
            return;
        }

        const updatedFavourites = [...existingFavourites, product];
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

        notification.success({
            message: 'Success',
            description: 'Added to Favourites',
            placement: 'topRight',
        });
    };

    const addToBag = () => {
        // Kiểm tra xem size và color đã được chọn chưa
        if (!size || !selectedColor) {
            notification.warning({
                message: 'Warning',
                description: 'Please select both size and color before adding to your bag.',
                placement: 'topRight',
            });
            return;
        }

        const product = {
            id: Date.now(),
            title: 'Nike Air Max SC',
            priceNew: 2189000,
            priceOld: null,
            imgSrc: mainImage,
            size: size,
            color: selectedColor,
            quantity: 1,
        };

        const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existingProductIndex = existingItems.findIndex(
            (item) => item.title === product.title && item.size === size && item.color === selectedColor,
        );

        if (existingProductIndex !== -1) {
            existingItems[existingProductIndex].quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(existingItems));

            notification.success({
                message: 'Success',
                description: 'Increased quantity of the product in Bag',
                placement: 'topRight',
            });
        } else {
            const updatedItems = [...existingItems, product];
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));

            notification.success({
                message: 'Success',
                description: 'Added to Bag',
                placement: 'topRight',
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            {appLoading ? (
                <dic className={cx('spin-wrapper')}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '45%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Spin size="large" />
                    </div>
                </dic>
            ) : (
                <>
                    {shoes ? (
                        <div className={cx('shoes')}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <Card style={{ width: 500, padding: 20, border: 0 }}>
                                        <Space align="start" size={16}>
                                            <Space direction="vertical" size={8}>
                                                {thumbnails.map((src, index) => (
                                                    <Image
                                                        key={index}
                                                        width={60}
                                                        src={src}
                                                        alt={`Sub image ${index + 1}`}
                                                        preview={true}
                                                        onMouseEnter={() => setMainImage(src)}
                                                    />
                                                ))}
                                            </Space>
                                            <Image height={600} width={535} src={mainImage} alt="Main product" />
                                        </Space>
                                    </Card>
                                </div>

                                <div
                                    className={cx('content')}
                                    style={{ margin: '45px', width: '550px', paddingLeft: '50px', marginLeft: '140px' }}
                                >
                                    {/* Title and Price */}
                                    <Title style={{ marginTop: '-10px', marginBottom: '5px' }} level={2}>
                                        {shoes.title}
                                    </Title>
                                    <p className={cx('tag')} level={2}>
                                        {shoes.tag}
                                    </p>

                                    <Title level={4}>{shoes.price}</Title>

                                    {/* Color */}
                                    <div className={cx('color-selection')} style={{ marginBottom: '20px' }}>
                                        <div className={cx('color-gird')}>
                                            {colors.map(({ name, colorCode, border }) => (
                                                <div
                                                    className={cx('color-item', { selected: selectedColor === name })}
                                                    key={name}
                                                    onClick={() => handleColorSelect(name)}
                                                >
                                                    <div
                                                        className={cx('color-circle')}
                                                        style={{ backgroundColor: colorCode }}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Size */}
                                    <div
                                        className={cx('size-table')}
                                        style={{ marginTop: '30px', marginBottom: '20px' }}
                                    >
                                        <Title level={5}>Select Size</Title>
                                        <Radio.Group onChange={handleChange} value={size}>
                                            <Radio.Button className={cx('size-btn')} value="EU 35.5">
                                                EU 35.5
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 36">
                                                EU 36
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 36.5">
                                                EU 36.5
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 37.5">
                                                EU 37.5
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 38">
                                                EU 38
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 38.5">
                                                EU 38.5
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 39">
                                                EU 39
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 40">
                                                EU 40
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 40.5">
                                                EU 40.5
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 41">
                                                EU 41
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 42">
                                                EU 42
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 42.5">
                                                EU 42.5
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 43">
                                                EU 43
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 44">
                                                EU 44
                                            </Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 44.5">
                                                EU 44.5
                                            </Radio.Button>
                                        </Radio.Group>
                                    </div>

                                    <div className={cx('action-btn')}>
                                        <Button
                                            className={cx('btn')}
                                            style={{ backgroundColor: 'black', color: 'white', marginBottom: '10px' }}
                                            onClick={addToBag}
                                        >
                                            Add to Bag
                                        </Button>
                                        <Button
                                            className={cx('btn')}
                                            onClick={addToFavourites}
                                            icon={<HeartOutlined />}
                                        >
                                            Favourite
                                        </Button>
                                    </div>

                                    <Paragraph style={{ marginTop: '20px' }}>
                                        <p style={{ marginBottom: '30px' }}>{shoes?.description}</p>
                                        <ul className={cx('paragraph-ul')}>
                                            <li className={cx('paragraph-li')}>Style: HEHE123</li>
                                            <li className={cx('paragraph-li')}>Contry/Region Of Origin: VietNam</li>
                                        </ul>
                                    </Paragraph>

                                    <Collapse
                                        bordered={false}
                                        defaultActiveKey={[]}
                                        expandIconPosition="end"
                                        style={{ background: '#fff', border: 'none' }}
                                    >
                                        <Panel
                                            header={
                                                <Text
                                                    style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                    }}
                                                    strong
                                                >
                                                    Free Delivery and Returns
                                                </Text>
                                            }
                                            key="1"
                                        >
                                            <p>Your order of 5.000.000VND or more gets free standard delivery</p>
                                            <ul className={cx('collapse-ul')}>
                                                <li className={cx('collapse-li')}>Style: HEHE123</li>
                                                <li className={cx('collapse-li')}>Contry/Region Of Origin: VietNam</li>
                                            </ul>
                                            <p>
                                                Orders are proessed and delivered Monday-Friday (excluding public
                                                holidays)
                                            </p>
                                            <p>
                                                Nike member enjoy <Link className={cx('free-return')}>free return</Link>
                                            </p>
                                        </Panel>

                                        <Panel
                                            header={
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        paddingRight: '20px',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: '20px',
                                                            fontWeight: 'bold',
                                                            color: 'black',
                                                        }}
                                                        strong
                                                    >
                                                        Reviews (1520)
                                                    </Text>
                                                    <Rate disabled defaultValue={4.8} />
                                                </div>
                                            }
                                            key="2"
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>4.8 Stars</span>
                                                <Link to="#" style={{ fontSize: '16px' }}>
                                                    <p className={cx('review-link')}>Write a review</p>
                                                </Link>
                                            </div>

                                            <div style={{ marginTop: '25px' }}>
                                                <Rate style={{ marginRight: '90px' }} disabled defaultValue={5} />
                                                <Text strong>NedraN636872912 - 14 Oct 2024</Text>
                                                <p style={{ marginTop: '10px' }}>
                                                    Purchase as a birthday gift for my Dad and he loves them.
                                                </p>
                                            </div>

                                            <div style={{ marginTop: '50px' }}>
                                                <Rate style={{ marginRight: '100px' }} disabled defaultValue={4} />
                                                <Text strong>Nikhil488489727 - 13 Oct 2024</Text>
                                                <p>Very uncomfortable to wear. Too heavy.</p>
                                            </div>

                                            <div style={{ marginTop: '50px' }}>
                                                <Rate style={{ marginRight: '105px' }} disabled defaultValue={3} />
                                                <Text strong>BenH582791177 - 06 Oct 2024</Text>
                                                <p>
                                                    I hate that I have to write this because AF1 are my all-time
                                                    favorite silhouette but the quality is just horrible now. Pre 2020 1
                                                    pair worn ~5 days a week lasted a year. Now they barely last 3
                                                    months.
                                                    <Link to="#">More</Link>
                                                </p>
                                            </div>

                                            {/* More Reviews link */}
                                            <div style={{ marginTop: '20px' }}>
                                                <Link to="#" style={{ fontSize: '16px' }}>
                                                    <p className={cx('review-link')}>More review</p>
                                                </Link>
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>hehe</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Shoes;
