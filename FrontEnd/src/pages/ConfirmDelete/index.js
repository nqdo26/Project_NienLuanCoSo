import classNames from 'classnames/bind';
import styles from './ConfirmDelete.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Radio, Image, Typography, Collapse, notification, Modal } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { getShoesApi } from '../../utils/api';
import { ShoesContext } from '../../components/Context/shoes.context';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Text } = Typography;

const cx = classNames.bind(styles);

function ConfirmDelete() {
    const { _id } = useParams();
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [shoes, setAShoes] = useState();
    const [size, setSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [mainImage, setMainImage] = useState('https://via.placeholder.com/400x400');

    useEffect(() => {
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const response = await getShoesApi(_id);
                if (response && response.data) {
                    setAShoes(response.data);
                    setShoes(response.data);
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

    const showConfirm = () => {
        Modal.confirm({
            title: 'Xác nhận xóa sản phẩm',
            content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
            onOk: () => {
                // Xử lý xóa sản phẩm ở đây
                notification.success({
                    message: 'Thành công',
                    description: 'Sản phẩm đã được xóa thành công.',
                });
                // Điều hướng về trang Shoes hoặc cập nhật trạng thái
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            {appLoading ? (
                <div className={cx('spin-wrapper')}>
                    <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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

                                <div className={cx('content')} style={{ margin: '45px', width: '550px', paddingLeft: '50px', marginLeft: '140px' }}>
                                    <Title style={{ marginTop: '-10px', marginBottom: '5px' }} level={2}>
                                        {shoes.title}
                                    </Title>
                                    <p className={cx('tag')} level={2}>
                                        {shoes.tag}
                                    </p>

                                    <Title level={4}>{shoes.price}</Title>

                                    <div className={cx('color-selection')} style={{ marginBottom: '20px' }}>
                                        <div className={cx('color-gird')}>
                                            {colors.map(({ name, colorCode }) => (
                                                <div
                                                    className={cx('color-item', { selected: selectedColor === name })}
                                                    key={name}
                                                    onClick={() => handleColorSelect(name)}
                                                >
                                                    <div className={cx('color-circle')} style={{ backgroundColor: colorCode }}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={cx('size-table')} style={{ marginTop: '30px', marginBottom: '20px' }}>
                                        <Title level={5}>Chọn kích thước</Title>
                                        <Radio.Group onChange={handleChange} value={size}>
                                            <Radio.Button className={cx('size-btn')} value="EU 35.5">EU 35.5</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 36">EU 36</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 36.5">EU 36.5</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 37.5">EU 37.5</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 38">EU 38</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 38.5">EU 38.5</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 39">EU 39</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 40">EU 40</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 40.5">EU 40.5</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 41">EU 41</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 42">EU 42</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 42.5">EU 42.5</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 43">EU 43</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 44">EU 44</Radio.Button>
                                            <Radio.Button className={cx('size-btn')} value="EU 44.5">EU 44.5</Radio.Button>
                                        </Radio.Group>
                                    </div>

                                    <div className={cx('action-btn')}>
                                        <Button
                                            className={cx('btn')}
                                            style={{ backgroundColor: 'black', color: 'white', marginBottom: '10px' }}
                                            onClick={showConfirm}
                                        >
                                            Xóa sản phẩm
                                        </Button>
                                        <Button
                                            className={cx('btn')}
                                            icon={<HeartOutlined />}
                                        >
                                            Yêu thích
                                        </Button>
                                    </div>

                                    <Paragraph style={{ marginTop: '20px' }}>
                                        <p style={{ marginBottom: '30px' }}>{shoes?.description}</p>
                                        <ul className={cx('paragraph-ul')}>
                                            <li className={cx('paragraph-li')}>Style: HEHE123</li>
                                            <li className={cx('paragraph-li')}>Country/Region Of Origin: Vietnam</li>
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
                                                    Miễn phí giao hàng và trả hàng
                                                </Text>
                                            }
                                            key="1"
                                        >
                                            <p>Đơn hàng từ 5.000.000VND trở lên sẽ được miễn phí giao hàng tiêu chuẩn</p>
                                            <p>Đơn hàng được xử lý và giao hàng từ thứ Hai đến thứ Sáu (không bao gồm ngày lễ)</p>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Sản phẩm không tìm thấy</div>
                    )}
                </>
            )}
        </div>
    );
}

export default ConfirmDelete;
