import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './FeaturedSection.module.scss';

const cx = classNames.bind(styles);
const { Meta } = Card;

const FeaturedSection = () => {
    return (
        <div>
            <h1 className={cx('title')}>Featured</h1>
            <Row gutter={16}>
                <Col span={8}>
                    <Card className={cx('card')} hoverable cover={<img alt="P-6000" src="https://link-to-image-1" />}>
                        <Meta title="Just In" description="P-6000" />
                        <Button className={cx('button')} style={{ marginTop: '10px' }}>
                            Shop
                        </Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        className={cx('card')}
                        hoverable
                        cover={<img alt="Nike Pegasus" src="https://link-to-image-2" />}
                    >
                        <Meta title="Run in the Rain" description="Nike Pegasus 41 GORE-TEX" />
                        <Button className={cx('button')} style={{ marginTop: '10px' }}>
                            Shop
                        </Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        className={cx('card')}
                        hoverable
                        cover={<img alt="For playtime" src="https://link-to-image-3" />}
                    >
                        <Meta title="Easy On" description="For playtime" />
                        <Button className={cx('button')} style={{ marginTop: '10px' }}>
                            Shop
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default FeaturedSection;
