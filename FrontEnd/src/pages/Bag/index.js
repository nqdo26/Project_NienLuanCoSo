import classNames from 'classnames/bind';
import styles from './Bag.module.scss';
import CardList from '~/components/CardList';
import ShoppingCart from '../../components/ShoppingCart';

const cx = classNames.bind(styles);

function Bag() {
    const titleCardList = 'You Might Also Like';

    return (
        <div className={cx('inner')}>
            <div className={cx('bag-item')}>
                <ShoppingCart />
                <div className={cx('divider1')}></div>
            </div>
    
            <div className={cx('divider')}></div>
            <CardList title={titleCardList} />
            <div className={cx('divider')}></div>
        </div>
    );
}

export default Bag;
