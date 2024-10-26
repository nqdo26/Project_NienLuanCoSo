import React, { useState } from 'react';
import { Typography, Button, Row, Col } from 'antd';

const { Title, Text } = Typography;

const RunningBanner = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{ textAlign: 'center', padding: '50px 0'}}>
            <Row justify="center">
                <Col span={24}>
                    <Text style={{ fontSize: '14px', color: 'gray', marginBottom: '8px' }}>Nike Running</Text>
                </Col>
                <Col span={24}>
                    <Title level={1} style={{ fontSize: '90px', fontWeight: 'bold', marginBottom: '0px' }}>
                        WINNING ISN'T COMFORTABLE
                    </Title>
                </Col>
                <Col span={24}>
                    <Text style={{ fontSize: '16px', color: 'gray', marginBottom: '24px' }}>
                        If you don't hate running a little, you don't love running enough.
                    </Text>
                </Col>
                <Col span={24} style={{ marginTop: '20px' }}>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            backgroundColor: isHovered ? 'gray' : 'black',
                            borderColor: isHovered ? 'gray' : 'black',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '0 30px',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Shop Running
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default RunningBanner;
