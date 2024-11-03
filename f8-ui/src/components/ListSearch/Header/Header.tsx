import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Header({ title, href }: { title: string; href: string }) {
    return (
        <div className={cx('header')}>
            <h5>{title}</h5>
            <Link to={href} className={cx('seeMore')}>
                Xem thêm
            </Link>
        </div>
    );
}

export default Header;
