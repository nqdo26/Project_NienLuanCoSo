import React, { useState } from 'react';
import styles from './NavMenu.module.scss';
import NewAndFeatured from './NewAndFeatured';
import Products from './Products';
import Sale from './Sale';
import Customise from './Customise';
import classNames from 'classnames/bind';
import SNKRS from './SNKRS';

const cx = classNames.bind(styles);

function NavMenu() {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <div className={cx('nav-items')}>
            <div onMouseEnter={() => setHoveredItem('newAndFeatured')} onMouseLeave={handleMouseLeave}>
                <NewAndFeatured isVisible={hoveredItem === 'newAndFeatured'} onMouseLeave={handleMouseLeave} />
            </div>
            <div onMouseEnter={() => setHoveredItem('products')} onMouseLeave={handleMouseLeave}>
                <Products isVisible={hoveredItem === 'products'} onMouseLeave={handleMouseLeave} />
            </div>
            <div onMouseEnter={() => setHoveredItem('sale')} onMouseLeave={handleMouseLeave}>
                <Sale isVisible={hoveredItem === 'sale'} onMouseLeave={handleMouseLeave} />
            </div>
            <div>
                <Customise/>
            </div>
            <div>
                <SNKRS />
            </div>
        </div>
    );
}

export default NavMenu;
