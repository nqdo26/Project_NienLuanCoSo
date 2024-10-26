import { Row, Col } from 'antd';
import classNames from 'classnames/bind';
import styles from './CustomMenu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const CustomMenu = () => {
    const [hovered, setHovered] = useState(false);

    return (
       <div className={cx('wrapper')}>
          <Row gutter={[16, 16]}>
              <Col span={6}>
                  <div
                      className={cx('menu-item')} // Sử dụng cx() để tạo className
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                  >
                      <ul className="menu-list">
                          <li className={cx('title')}>Icon</li>
                          <li>Air Force 1</li>
                          <li>Huarache</li>
                          <li>Air Max 90</li>
                          <li>Air Max 95</li>
                          <li className={cx({ hidden: !hovered })}>Air Max 97</li>
                          <li className={cx({ hidden: !hovered })}>Air Max 270</li>
                          <li className={cx({ hidden: !hovered })}>Air Max 720</li>
                          <li className={cx({ hidden: !hovered })}>Vapormax</li>
                      </ul>
                  </div>
              </Col>
  
              <Col span={6}>
                  <div
                      className={cx('menu-item')}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                  >
                      <ul className="menu-list">
                          <li className={cx('title')}>Shoes</li>
                          <li>All Shoes</li>
                          <li>Custom Shoes</li>
                          <li>Jordan Shoes</li>
                          <li>Running Shoes</li>
                          <li className={cx({ hidden: !hovered })}>Basketball Shoes</li>
                          <li className={cx({ hidden: !hovered })}>Football Shoes</li>
                          <li className={cx({ hidden: !hovered })}>Gym & Training Shoes</li>
                          <li className={cx({ hidden: !hovered })}>Lifestyle Shoes</li>
                      </ul>
                  </div>
              </Col>
  
              <Col span={6}>
                  <div
                      className={cx('menu-item')}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                  >
                      <ul className="menu-list">
                          <li className={cx('title')}>Clothing</li>
                          <li>All Clothing</li>
                          <li>Hoodies & Pullovers</li>
                          <li>Shirts & Tops</li>
                          <li>Jackets</li>
                          <li className={cx({ hidden: !hovered })}>Compression & Nike Pro</li>
                          <li className={cx({ hidden: !hovered })}>Trousers & Leggings</li>
                          <li className={cx({ hidden: !hovered })}>Shorts</li>
                      </ul>
                  </div>
              </Col>
  
              <Col span={6}>
                  <div
                      className={cx('menu-item')}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                  >
                      <ul className="menu-list">
                          <li className={cx('title')}>Kids</li>
                          <li>Infant & Toddler Shoes</li>
                          <li>Kids' Shoes</li>
                          <li>Kids' Jordan Shoes</li>
                          <li>Kids' Basketball Shoes</li>
                          <li className={cx({ hidden: !hovered })}>Kids' Running Shoes</li>
                          <li className={cx({ hidden: !hovered })}>Kids' Clothing</li>
                          <li className={cx({ hidden: !hovered })}>Kids' Backpacks</li>
                          <li className={cx({ hidden: !hovered })}>Kids' Socks</li>
                      </ul>
                  </div>
              </Col>
          </Row>
       </div>
    );
};

export default CustomMenu;
