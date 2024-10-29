import { Card, Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './CardProductManage.module.scss';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const cx = classNames.bind(styles);

function CardProductManage({ title, tag, numberOfColors, price, onDelete }) {
    const { Title, Text } = Typography;

    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    return (
        <div className={cx('card-size')}>
            <Card hoverable cover={<img alt="example" src="https://via.placeholder.com/240" />}>
                <div className={cx('icon-group')}>
                    <Link to="/editproduct">
                        <EditOutlined className={cx('icon')} />
                    </Link>
                    <DeleteOutlined className={cx('icon')} onClick={onDelete} />
                </div>
                <div className={cx('card-body')}>
                    <Title
                        style={{
                            margin: '0px',
                            fontSize: '16px',
                        }}
                        level={5}
                    >
                        {title}
                    </Title>
                    <Text type="secondary">{tag}</Text>
                    <br />
                    <Text type="secondary">{numberOfColors} màu</Text>
                    <br />
                    <div style={{ height: '10px' }}></div>
                    <Title level={5}>{formatPrice(price)}đ</Title>
                </div>
            </Card>
        </div>
    );
}

export default CardProductManage;
