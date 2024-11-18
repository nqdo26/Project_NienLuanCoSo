import classNames from 'classnames/bind';
import styles from './Shoes.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Radio, Image, Typography, Rate, Collapse, notification, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
import { Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getShoesApi, addBagApi } from '../../utils/api';
import { ShoesContext } from '~/components/Context/shoes.context';
import { AuthContext } from '~/components/Context/auth.context';
import { deleteShoesApi, addFavouriteApi } from '../../utils/api';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Text } = Typography;

const cx = classNames.bind(styles);

function Shoes() {
    const { _id } = useParams();
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [shoes, setAShoes] = useState();
    const { auth } = useContext(AuthContext);
    const [size, setSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const navigate = useNavigate();
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingAddBag, setLoadingAddBag] = useState(false);

    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    useEffect(() => {
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const response = await getShoesApi(_id);
                console.log('>>>Data:', response.data);

                if (response && response.data) {
                    setAShoes(response.data);
                    setShoes(response.data);
                    setMainImage(response.data.images[0]); // Set the first image as the main image
                    console.log('>>>Shoes set to:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setAppLoading(false);
            }
        };

        fetchShoes();
    }, [_id, setAppLoading, setShoes]);

    const handleChange = (e) => {
        setSize(e.target.value);
    };

    const handleColorSelect = (name) => {
        setSelectedColor(name);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: `Are you sure you want to delete ${shoes.title}?`,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: handleDeleteShoes,
            onCancel() {
                console.log('Cancel delete');
            },
        });
    };

    const handleDeleteShoes = async () => {
        try {
            const response = await deleteShoesApi(shoes._id);
            console.log('>>>Delete product:', response.data);
            if (response.EC === 0) {
                notification.success({
                    message: 'Success',
                    description: `Delete ${shoes.title} successfully.`,
                    placement: 'topRight',
                });
                navigate(`/productmanage`);
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data ? response.data.EM : 'An unexpected error occurred.',
                    placement: 'topRight',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'An error occurred while deleting the product.',
                placement: 'topRight',
            });
            console.error('Error deleting product:', error);
        }
    };

    const handleAddFavourite = async () => {
        setLoadingUpdate(true);
    
        try {
            const response = await addFavouriteApi(auth.user.email, shoes.title, shoes.tag, shoes.price, shoes.numberOfColors, shoes._id);
    
            if (response.EC === 0) {
                console.log('>>>Add to favourite:', response);
                notification.success({
                    message: 'Success',
                    description: response.EM || 'Added to favourite list successfully.',
                    placement: 'topRight',
                });
            } else {
                notification.info({
                    description: response.EM || 'This product is already in your favourite list.',
                    placement: 'topRight',
                });
            }
        } catch (error) {
            if (error.response?.status === 409) {
                notification.info({
                    message: 'Warning',
                    description: 'This product is already in your favourite list.',
                    placement: 'topRight',
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'An error occurred while adding to favourite list.',
                    placement: 'topRight',
                });
            }
            console.error('Error in handleAddFavourite:', error);
        }
        setLoadingUpdate(false);
    };

    const handleAddToBag = async () => {
        setLoadingAddBag(true);

        if (!selectedColor || !size) {
            notification.error({
                message: 'Please select color and size',
                description: 'Make sure to choose both color and size before adding to the bag.',
            });
            setLoadingAddBag(false);
            return;
        }
    
        try {
            const response = await addBagApi(auth.user.email, shoes.title, shoes.tag, size, shoes.price, selectedColor, shoes._id);
            console.log('>>>Add to bag:', response);
            if (response && response.EC === 0) {
                notification.success({
                    message: 'Success',
                    description: 'Added to bag successfully.',
                });
            } else if (response.EC === 3) {
                notification.info({
                    message: 'Product has axisted in bag',
                    description: 'Increased the number of products',
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.EM,
                });
            }
        } catch (error) {
            console.error('Error adding to bag:', error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while adding the item to the bag.',
            });
        }
        setLoadingAddBag(false);
    };
  
    return (
        <div className={cx('wrapper')}>
            {appLoading ? (
                <div className={cx('spin-wrapper')}>
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
                </div>
            ) : (
                <>
                    {shoes ? (
                        <div className={cx('shoes')}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div>
                                    <Card style={{ width: 500, padding: 20, border: 0 }}>
                                        <Space align="start" size={16}>
                                            <Space direction="vertical" size={8}>
                                                {shoes.images.map((src, index) => (
                                                    <Image
                                                        key={index}
                                                        width={58}
                                                        height={63}
                                                        src={src}
                                                        alt={`Sub image ${index + 1}`}
                                                        preview={true}
                                                        onMouseEnter={() => setMainImage(src)}
                                                        style={{ borderRadius: '7px' }}
                                                    />
                                                ))}
                                            </Space>
                                            <Image 
                                                style={{ borderRadius: '7px' }} 
                                                height={650} width={535} 
                                                src={mainImage || shoes.images[0]}
                                                alt="Main product" />
                                        </Space>
                                    </Card>
                                </div>

                                <div
                                    className={cx('content')}
                                    style={{ margin: '45px', width: '550px', paddingLeft: '50px', marginLeft: '140px' }}
                                >
                                   <div className={cx('header')}>
                                        {/* Title and Price */}
                                        <Title style={{ marginTop: '-10px', marginBottom: '5px' }} level={2}>
                                            {shoes.title}
                                        </Title>
                                        
                                        {auth.user.role === 'ADMIN'
                                                ? [
                                                      <div className={cx('icon-group')} key="icons">
                                                          <Link to={`/editproduct/${shoes._id}`} className={cx('icon')}>
                                                              <EditOutlined />
                                                          </Link>
                                                          <div className={cx('divider')}></div>
                                                          <button className={cx('icon')} onClick={showDeleteConfirm}>
                                                              <DeleteOutlined />
                                                          </button>
                                                      </div>,
                                                  ]
                                                : null}
    
                                   </div>
                                    <p className={cx('tag')} level={2}>
                                        {shoes.tag}
                                    </p>

                                    <Title level={4}>{formatPrice(shoes.price)}₫</Title>

                                    {/* Color */}
                                    <div className={cx('color-selection')} style={{ marginBottom: '20px' }}>
                                        <div className={cx('color-gird')}>
                                            {shoes.colors.map((colorCode, index) => (
                                                <div
                                                    className={cx('color-item', { selected: selectedColor === colorCode })}
                                                    key={index}
                                                    onClick={() => handleColorSelect(colorCode)}
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
                                            icon={<ShoppingCartOutlined />}
                                            style={{ backgroundColor: 'black', color: 'white', marginBottom: '10px' }}
                                            onClick={handleAddToBag}
                                            loading={loadingAddBag}
                                        >
                                            {loadingAddBag ? 'Adding...' : 'Add to Bag'}
                                        </Button>
                                        <Button
                                            className={cx('btn')}
                                            icon={<HeartOutlined />}
                                            onClick={handleAddFavourite}
                                            loading={loadingUpdate}
                                        >
                                            {loadingUpdate ? 'Adding...' : 'Add to Favourite'}
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
                        <div>loadding error</div>
                    )}
                </>
            )}
        </div>
    );
}

export default Shoes;