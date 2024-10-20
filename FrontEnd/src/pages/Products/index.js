import { Col } from 'antd';
import { Layout, Row} from 'antd';
import CardProduct from '~/components/CardProduct';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

function Products() {
    return (
        <div className={cx('inner')}>
            <Layout>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                    </Col>
                    <Col span={8}>
                        <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                    </Col>
                    <Col span={8}>
                        <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                    </Col>
                    <Col span={8}>
                        <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                    </Col>
                    <Col span={8}>
                        <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                    </Col>
                    <Col span={8}>
                        <CardProduct title="Nike Air Max 270 " text="hehe" color="5 colors" price="2,200,000đ" />
                    </Col>
                </Row>
            </Layout>
        </div>
    );
}

export default Products;
