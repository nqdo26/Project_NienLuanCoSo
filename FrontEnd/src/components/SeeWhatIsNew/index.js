import React from 'react';
import { Card, Carousel } from 'antd';
import classNames from 'classnames/bind';
import styles from './SeeWhatIsNew.module.scss';

const cx = classNames.bind(styles);
const { Meta } = Card;

const App = () => {
  const products = [
    {
      name: 'Nike Air Force 1 Dance',
      price: '3,829,000₫',
      description: "Women's Shoes",
      img: 'https://link-to-nike-af1.jpg',
    },
    {
      name: 'Nike Air Rift SE',
      price: '3,519,000₫',
      description: "Women's Shoes",
      img: 'https://link-to-nike-air-rift.jpg',
    },
    {
      name: 'Nike Metcon 9 AMP',
      price: '4,109,000₫',
      description: "Men's Workout Shoes",
      img: 'https://link-to-nike-metcon-9.jpg',
    },
  ];

  return (
    <div className={cx('wrapper')} style={{ margin: '0 auto', maxWidth: '100%' }}>
      <h2 className={cx('title')}>See What's New</h2>
      <Carousel dots={false} arrows={true} slidesToShow={4}>
        {products.map((product, index) => (
          <Card className={cx('card')}
            key={index}
            hoverable
            cover={<img alt={product.name} src={product.img} style={{ height: '200px', objectFit: 'cover' }} />}
          >
            <Meta title={product.name} description={product.description} />
            <p>{product.price}</p>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
