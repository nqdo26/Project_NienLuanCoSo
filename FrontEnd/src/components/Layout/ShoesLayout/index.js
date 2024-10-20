import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import classNames from 'classnames/bind';
import styles from './ShoesLayout.module.scss';
import React, { useState } from 'react';
import { Button, Radio, Image, Typography, Rate, Collapse } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Card, Space } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Text } = Typography;

const cx = classNames.bind(styles);

function ShoesLayout() {
    const [size, setSize] = useState(null);

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    // State để lưu trữ hình ảnh chính hiện tại
    const [mainImage, setMainImage] = useState('https://via.placeholder.com/400x400');

    // Danh sách các hình ảnh thu nhỏ
    const thumbnails = [
        'https://via.placeholder.com/400x400',
        'https://via.placeholder.com/400x400/0000FF',
        'https://via.placeholder.com/400x400/FF0000',
        'https://via.placeholder.com/400x400/00FF00',
        'https://via.placeholder.com/400x400/0000FF',
        'https://via.placeholder.com/400x400/00FF12',
    ];
    return (
        <>
            <Header />
            <div className={cx('body')}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Phần ảnh sản phẩm */}
                    <div>
                        <Card style={{ width: 500, padding: 20, border: 0 }}>
                            <Space align="start" size={16}>
                                {/* Vertical Thumbnail Gallery */}
                                <Space direction="vertical" size={8}>
                                    {thumbnails.map((src, index) => (
                                        <Image
                                            key={index}
                                            width={60}
                                            src={src}
                                            alt={`Sub image ${index + 1}`}
                                            preview={false}
                                            onMouseEnter={() => setMainImage(src)} // Cập nhật hình ảnh chính khi hover
                                        />
                                    ))}
                                </Space>

                                {/* Main Product Image */}
                                <Image width={400} src={mainImage} alt="Main product" />
                            </Space>
                        </Card>
                    </div>

                    {/* Phần thông tin sản phẩm */}
                    <div style={{ padding: '39px', width: '600px', paddingLeft: '50px' }}>
                        <Title level={3}>Nike Air Max SC</Title>
                        <Title level={4}>2,189,000₫</Title>

                        {/* Lựa chọn kích cỡ */}
                        <div style={{ marginBottom: '20px' }}>
                            <Title level={5}>Select Size</Title>
                            <Radio.Group onChange={handleSizeChange} value={size}>
                                <Radio.Button value="EU 40">EU 40</Radio.Button>
                                <Radio.Button value="EU 41">EU 41</Radio.Button>
                                <Radio.Button value="EU 42">EU 42</Radio.Button>
                                <Radio.Button value="EU 43">EU 43</Radio.Button>

                                {/* Thêm các kích cỡ khác */}
                            </Radio.Group>
                        </div>

                        {/* Nút thêm vào giỏ hàng và yêu thích */}
                        <Button type="primary" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            Add to Bag
                        </Button>
                        <Button icon={<HeartOutlined />}>Favourite</Button>

                        {/* Mô tả sản phẩm */}
                        <Paragraph style={{ marginTop: '20px' }}>
                            With its easy-going lines, heritage athletics look and, of course, visible Air cushioning,
                            the Nike Air Max SC is the perfect finish to any outfit.
                        </Paragraph>

                        {/* Thông tin chi tiết */}
                        <Collapse
                            bordered={false}
                            defaultActiveKey={[]}
                            expandIconPosition="end"
                            style={{ background: '#fff', border: 'none' }}
                        >
                            {/* Panel cho Free Delivery and Returns */}
                            <Panel
                                header={<Text strong>Free Delivery and Returns</Text>}
                                key="1"
                            >
                                <p>Free delivery on orders over $50.</p>
                            </Panel>

                            {/* Panel cho Reviews */}
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
                                        <Text strong>Reviews (300)</Text>
                                        <Rate disabled defaultValue={4} />
                                    </div>
                                }
                                key="2"
                            >
                                <p>Customer reviews will be displayed here.</p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ShoesLayout;
