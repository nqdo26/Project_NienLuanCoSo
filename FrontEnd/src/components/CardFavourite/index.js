import { Card, Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';

const cx = classNames.bind(styles);
function CardFavourite({title, color, description, price}) {
    const { Title, Text } = Typography;
    return (
        <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
           <div className={cx('card-body')} >
                <Title style={{
                    margin:'0px',
                    fontSize: '16px',
                }} level={5}>{title}</Title>
                <Text type="secondary">{description}</Text>
                <br />
                <Text type="secondary">{color}</Text>
                <br />
                <div style={{ height: '10px' }}></div>
                <Title level={5}>{price}</Title>
           </div>
        </Card>
    );
}

export default CardFavourite;
