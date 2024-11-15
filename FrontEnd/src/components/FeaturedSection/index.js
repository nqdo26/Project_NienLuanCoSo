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
                    <Card
                        className={cx('card')}
                        hoverable
                        cover={<img alt="P-6000" src={require('~/assets/images/feature/img-5.jpg')} />}
                    >
                        <div className={cx('overlay-content')}>
                            <Meta
                                title={<span className={cx('meta-title')}>Unleash Your Potential</span>}
                                description={<span className={cx('meta-description')}>Engineered for champions, built for everyone</span>}
                            />
                            <Button className={cx('button')}>
                                Shop
                            </Button>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        className={cx('card')}
                        hoverable
                        cover={<img alt="Nike Pegasus" src={require('~/assets/images/feature/img-1.jpg')} />}
                    >
                        <div className={cx('overlay-content')}>
                            <Meta
                                title={<span className={cx('meta-title')}>Own the Moment, Own the Run</span>}
                                description={<span className={cx('meta-description')}>Revolutionizing comfort, redefining performance</span>}
                            />
                            <Button className={cx('button')}>
                                Shop
                            </Button>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        className={cx('card')}
                        hoverable
                        cover={<img alt="For playtime" src={require('~/assets/images/feature/img-4.jpg')} />}
                    >
                        <div className={cx('overlay-content')}>
                            <Meta
                                title={<span className={cx('meta-title')}>Where Comfort Meets Style</span>}
                                description={<span className={cx('meta-description')}>Built to keep you moving, wherever life takes you</span>}
                            />
                            <Button className={cx('button')}>
                                Shop
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default FeaturedSection;
