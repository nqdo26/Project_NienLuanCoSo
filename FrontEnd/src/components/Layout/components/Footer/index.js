import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('main')}>
                    <div className={cx('items')}>
                        <h4 className={cx('title')}>Resoures</h4>
                        <p>Find A Store</p>
                        <p>Become A Menber</p>
                        <p>Send Us Feedback</p>
                    </div>

                    <div className={cx('items')}>
                        <h4 className={cx('title')}>Help</h4>
                        <p>Get Help</p>
                        <p>Order Status</p>
                        <p>Delivery</p>
                        <p>Payment Options</p>
                        <p>Contact Us</p>
                    </div>

                    <div className={cx('items')}>
                        <h4 className={cx('title')}>About Nike</h4>
                        <p>About Nike</p>
                        <p>News</p>
                        <p>Careers</p>
                        <p>Investors</p>
                        <p>Sustainability</p>
                    </div>
                </div>
                <div className={cx('bottom')}>
                    <p>@2024 Nike, Inc. All rights reverved</p>
                    <p>Terms of Sale</p>
                    <p>Terms of Use</p>
                    <p>Nike Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
