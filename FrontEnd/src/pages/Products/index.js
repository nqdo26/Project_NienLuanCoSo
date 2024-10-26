import { Col } from 'antd';
import { Layout, Row } from 'antd';
import CardProduct from '~/components/CardProduct';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className={cx('inner')}>
            <Layout>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Link to="/shoes">
                            <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/shoes">
                            <CardProduct title="Nike Air Jordan 42 " text="keke" color="3 colors" price="1,000,000đ" />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/shoes">
                            <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/shoes">
                            <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/shoes">
                            <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/shoes">
                            <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                        </Link>
                    </Col>
                </Row>
            </Layout>
        </div>
    );
}

export default Products;
