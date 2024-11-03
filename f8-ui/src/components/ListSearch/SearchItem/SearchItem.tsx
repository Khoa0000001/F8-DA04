import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function SearchItem({ title, src, href }: { title: string; src: string; href: string }) {
    return (
        <Link to={href} className={cx('search_item')}>
            <div className={cx('fallback_avatar')}>
                <Image src={src} className={cx('avatar')} alt={title} />
            </div>
            <span>{title}</span>
        </Link>
    );
}

export default SearchItem;
