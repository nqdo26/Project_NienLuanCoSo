import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Spin, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './EditProduct.module.scss';
import { ShoesContext } from '../../components/Context/shoes.context';
import { useNavigate, useParams } from 'react-router-dom';
import { getShoesApiForEdit, updateShoesApi } from '../../utils/api'; 

const cx = classNames.bind(styles);

const EditProduct = () => {
    const { _id } = useParams();
    const { setShoes, appLoading, setAppLoading } = useContext(ShoesContext);
    const [form] = Form.useForm();
    const [colorFields, setColorFields] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [initialColors, setInitialColors] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
         // eslint-disable-next-line react-hooks/exhaustive-deps
        const fetchShoes = async () => {
            setAppLoading(true);
            try {
                const response = await getShoesApiForEdit(_id);
                if (response && response.data) {
                    setShoes(response.data);
                    form.setFieldsValue({
                        title: response.data.title,
                        tag: response.data.tag,
                        price: response.data.price,
                        numberOfColors: response.data.colors.length,
                        description: response.data.description,
                        minSize: response.data.minSize,
                        maxSize: response.data.maxSize,
                    });
                    setInitialColors(response.data.colors); 
                    setColorFields(
                        response.data.colors.map((color, index) => {
                            return (
                                <Form.Item
                                    key={`color-${index}`}
                                    label={`Color ${index + 1}`}
                                    name={`color-${index + 1}`}
                                    initialValue={color}
                                    rules={[{ required: true, message: 'Please input the color!' }]}
                                >
                                    <Input placeholder={`Enter color ${index + 1}`} />
                                </Form.Item>
                            );
                        })
                    );
                    
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setAppLoading(false);
            }
        };

        fetchShoes();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id, form]);

    const handleNumberOfColorsChange = (value) => {
        setColorFields((prevFields) => {
            const colors = Array.from({ length: value }, (_, index) => (
                <Form.Item
                    key={`color-${index}`}
                    label={`Color ${index + 1}`}
                    name={`color-${index + 1}`}
                    rules={[{ required: true, message: 'Please input the color!' }]}
                >
                    <Input placeholder={`Enter color ${index + 1}`} />
                </Form.Item>
            ));
            return colors;
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
        const colors = [];
        for (let i = 0; i < values.numberOfColors; i++) {
            colors.push(values[`color-${i + 1}`] || initialColors[i]); 
        }

        try {
            const response = await updateShoesApi(
                _id,
                values.title,
                values.tag,
                values.price,
                values.numberOfColors,
                colors,
                values.minSize,
                values.maxSize,
                values.description
            );

            if (response.EC === 0) {
                message.success('Update product success');
                navigate(`/productmanage/${_id}`); 
            } else {
                message.error(response.data.EM);
                message.error('Error update product');
            }
        } catch (error) {
            console.error('Failed to update shoe:', error);
            message.error('An error occurred while updating the product.');
        } finally {
            setLoadingUpdate(false);
        }
    };

    const handleBack = () => {
        navigate(`/productmanage/${_id}`); 
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-size')}>
                <h1 className={cx('title')}>Edit Product</h1>
                {appLoading ? (
                    <div className={cx('spin-wrapper')}>
                        <div
                            style={{
                                position: 'absolute',
                                top: '60%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Spin size="large" />
                        </div>
                    </div>
                ) : (
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input the title!' }]}
                        >
                            <Input placeholder="Enter shoe title" />
                        </Form.Item>

                        <Form.Item
                            label="Tag"
                            name="tag"
                            rules={[{ required: true, message: 'Please input the tag!' }]}
                        >
                            <Input placeholder="Enter product tag" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter price" />
                        </Form.Item>

                        <Form.Item
                            label="Number of Colors"
                            name="numberOfColors"
                            rules={[{ required: true, message: 'Please select the number of colors!' }]}
                        >
                            <InputNumber
                                min={1}
                                max={5}
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
                                {loadingUpdate ? "Submitting..." : "Submit"}
                            </Button>

                    
                                    <Button onClick={handleBack}>Back</Button>
                               
                            </div>
                        </Form.Item>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default EditProduct;
