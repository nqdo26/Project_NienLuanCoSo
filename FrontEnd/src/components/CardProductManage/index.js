import { Card, Typography } from 'antd';
import classNames from 'classnames/bind';
import styles from './CardProductManage.module.scss';
import { SettingOutlined} from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '~/components/Context/auth.context';


const cx = classNames.bind(styles);

function CardProductManage({ title, tag, numberOfColors, price, images }) {
    const { auth } = useContext(AuthContext);
    const { Title, Text } = Typography;


    const formatPrice = (price) => {
        return price.toLocaleString();
    };

    return (
        <div className={cx('card-size')}>
             <Card hoverable cover={<img alt='product' className={cx('product-image')} src={images[0]} />}>
                {auth.user.role === 'ADMIN'
                    ? [
                          <div className={cx('icon-group')} key="icons">
                              <div  className={cx('icon')}>
                                <SettingOutlined />
                              </div>
                        
                          </div>,
                      ]
                    : null}
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
                    <Title level={5}>{formatPrice(price)}₫</Title>
                </div>
            </Card>
        </div>
    );
}

export default CardProductManage;
