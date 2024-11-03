import classNames from 'classnames/bind';
import styles from './ScrollListHeader.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ScrollListHeader({
    userNumber,
    title,
    viewmore,
    hrefView,
}: {
    userNumber: number | null;
    title: string;
    viewmore: string;
    hrefView: string;
}) {
    return (
        <div>
            {!!userNumber && (
                <p className={cx('sub-heading')}>
                    <strong>{userNumber}+</strong> người khác đã học
                </p>
            )}
            <div className={cx('heading-wrap')}>
                <h2 className={cx('heading')}>
                    <Link to={hrefView}>{title}</Link>
                </h2>
                <Link to={hrefView} className={cx('view-all-icon')}>
                    {viewmore}
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </div>
        </div>
    );
}

export default ScrollListHeader;
