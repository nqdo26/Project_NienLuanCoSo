import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, notification, Select} from 'antd';
import classNames from 'classnames/bind';
import styles from './AddProduct.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createShoesApi } from '../../utils/api';
import { ColorPicker } from 'antd';
const cx = classNames.bind(styles);

const AddProduct = () => {
    const [form] = Form.useForm();
    
    const { Option } = Select;

    const navigate = useNavigate();

    //color
    const [numberOfColors, setNumberOfColors] = useState(0);

    const [colorFields, setColorFields] = useState([]);
    const [colorValues, setColorValues] = useState({});

    //size
    const [sizes, setSizes] = useState([]);

    //loadding-effect
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleNumberOfColorsChange = (value) => {
        setNumberOfColors(value);

        const colors = Array.from({ length: value }, (_, index) => (
            <Form.Item key={`color-${index}`} label={`Color ${index + 1}`} required>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <ColorPicker
                        value={colorValues[`color-${index}`]}
                        onChange={(color) => handleColorChange(`color-${index}`, color.hex)}
                    />
                    <Form.Item name={`color-${index}`} noStyle>
                        <Input
                            value={colorValues[`color-${index}`]}
                            onChange={(e) => handleHexInputChange(`color-${index}`, e.target.value)}
                            placeholder="Enter HEX color"
                            maxLength={7}
                        />
                    </Form.Item>
                </div>
            </Form.Item>
        ));
        setColorFields(colors);
    };

    const handleColorChange = (colorKey, hexValue) => {
        setColorValues((prevValues) => {
            const updatedValues = { ...prevValues, [colorKey]: hexValue };
            form.setFieldsValue(updatedValues);
            return updatedValues;
        });
    };

    const handleHexInputChange = (colorKey, hexValue) => {
        if (!hexValue.startsWith('#')) {
            hexValue = `#${hexValue}`;
        }
        hexValue = hexValue.toUpperCase();

        setColorValues((prevValues) => {
            const updatedValues = { ...prevValues, [colorKey]: hexValue };
            form.setFieldsValue(updatedValues);
            return updatedValues;
        });
    };

    const handleSizeChange = (minSize, maxSize) => {
        if (minSize < 35) minSize = 35;
        if (maxSize > 45) maxSize = 45;

        const sizeArray = [];
        for (let size = minSize; size <= maxSize; size += 0.5) {
            sizeArray.push(size.toFixed(1));
        }
        setSizes(sizeArray);
    };

    const onFinish = async (values) => {
        setLoadingUpdate(true);
        const { title, type, tag, price, numberOfColors, minSize, maxSize, description } = values;

        // Lấy mã màu từ colorValues để gửi đến BackEnd
        const colors = Object.values(colorValues).slice(0, numberOfColors);

        const res = await createShoesApi(
            title,
            type,
            tag,
            price,
            numberOfColors,
            colors,
            minSize,
            maxSize,
            description,
        );

        if (res.EC === 1) {
            setLoadingUpdate(false);
            notification.error({
                message: 'ERROR',
                description: res.EM,
            });
        } else if (res.EC === 0) {
            notification.success({
                message: 'CREATE PRODUCT',
                description: res.EM,
            });
            navigate('/productmanage');
        } else {
            notification.error({
                message: 'ERROR',
                description: 'An error occurred',
            });
        }

        console.log('>> Success: ', res);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-size')}>
                <h1 className={cx('title')}>Add New Product</h1>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input placeholder="Enter shoe title" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select the type!' }]}
                    >
                        <Select defaultValue="--Select type--">
                            <Option value="jordan">Jordan</Option>
                            <Option value="nike">Nike</Option>
                            <Option value="running">Running</Option>
                            <Option value="tranning&gym">Tranning & Gym</Option>
                            <Option value="athletics">Athletics</Option>
                            <Option value="walking">Walking</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Tag" name="tag" rules={[{ required: true, message: 'Please input the tag!' }]}>
                        <Input placeholder="Enter product tag" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            placeholder="Enter price"
                            parser={(value) => value.replace(/[^0-9]/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Number of Colors"
                        name="numberOfColors"
                        rules={[{ required: true, message: 'Please select the number of colors!' }]}
                    >
                        <InputNumber
                            min={1}
                            max={3}
                            onChange={handleNumberOfColorsChange}
                            style={{ width: '100%' }}
                            placeholder="Enter number of colors"
                        />
                    </Form.Item>

                    {colorFields}

                    <Form.Item label="Size Range" required>
                        <Form.Item
                            name="minSize"
                            noStyle
                            rules={[{ required: true, message: 'Please select a minimum size!' }]}
                        >
                            <InputNumber
                                min={35}
                                max={45}
                                placeholder="Min Size (≥ 35)"
                                style={{ width: '48%', marginRight: '4%' }}
                                onChange={(value) => handleSizeChange(value, form.getFieldValue('maxSize'))}
                                parser={(value) => value.replace(/[^0-9]/g, '')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="maxSize"
                            noStyle
                            rules={[{ required: true, message: 'Please select a maximum size!' }]}
                        >
                            <InputNumber
                                min={35}
                                max={45}
                                placeholder="Max Size (≤ 45)"
                                style={{ width: '48%' }}
                                onChange={(value) => handleSizeChange(form.getFieldValue('minSize'), value)}
                                parser={(value) => value.replace(/[^0-9]/g, '')}
                            />
                        </Form.Item>
                    </Form.Item>

                    {sizes.length > 0 && (
                        <Form.Item label="Available Sizes">
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {sizes.map((size, index) => (
                                    <div key={index} style={{ width: '20%', marginBottom: '8px' }}>
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea placeholder="Enter product description" rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <div className={cx('action-btn')}>
                            <Button type="primary" htmlType="submit" loading={loadingUpdate}>
                                {loadingUpdate ? 'Adding Product' : 'Add Product'}
                            </Button>
                            <Link to="/productmanage">
                                <Button>Back</Button>
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;
