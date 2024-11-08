import { Button, Card, Typography} from 'antd';
import classNames from 'classnames/bind';
import styles from './CardProductFavourite.module.scss';
import { HeartOutlined } from '@ant-design/icons';


const cx = classNames.bind(styles);

function CardProductFavourite({ title, numberOfColors, text, price, onClick}) {
    const { Title, Text } = Typography;

    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    return (
        <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
            <div className={cx('card-body')}>
                <Button 
                    className={cx('heart-icon')} 
                    onClick={(e) => {
                        e.stopPropagation(); // Ngừng sự kiện chuyển trang
                        onClick(); // Gọi hàm xóa sản phẩm
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
                    <Button type="primary">Add To Bag</Button>
                </div>
            </div>
        </Card>
    );
}

export default CardProductFavourite;
