import { Button, Card, Typography} from 'antd';
import classNames from 'classnames/bind';
import styles from './CardProductFavourite.module.scss';
import { HeartOutlined } from '@ant-design/icons';


const cx = classNames.bind(styles);

function CardProductFavourite({ title, numberOfColors, text, price, image, onClick}) {
    const { Title, Text } = Typography;

    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    return (
        <Card hoverable cover={<img alt='product' className={cx('product-image')} src={image}/>}>
            <div className={cx('card-body')}>
                <Button 
                    className={cx('heart-icon')} 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onClick(); 
                    }}
                >
                    <HeartOutlined />
                </Button>
                <Title
                    style={{
                        margin: '0px',
                        fontSize: '16px',
                    }}
                    level={5}
                >
                    {title}
                </Title>
                <Text type="secondary">{text}</Text>
                <br />
                <Text type="secondary">{numberOfColors} Màu</Text>
                <div className={cx('wrapper')}>
                    <Title style={{ marginTop: '8px' }} level={5}>
                        {formatPrice(price)}₫
                    </Title>
                </div>
            </div>
        </Card>
    );
}

export default CardProductFavourite;
