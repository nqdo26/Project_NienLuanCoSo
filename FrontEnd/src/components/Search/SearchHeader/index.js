import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './SearchHeader.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import SearchInHeader from './SearchInHeader';

const cx = classNames.bind(styles);

function SearchHeader({ setShowResult }) {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo-link')}>
                    <img src={images.logo} alt="Nike" />
                </Link>

                <SearchInHeader />
                <div className={cx('actions')}>
                    <Button onClick={() => setShowResult(false)} className={cx('btn-cancel')}>
                        Cancel
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default SearchHeader;
