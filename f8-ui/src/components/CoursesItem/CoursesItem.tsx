import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './CoursesItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function CoursesItem({
    img,
    btn,
    title,
    role,
    children,
    to,
}: {
    img: string;
    btn: string;
    title: string;
    role: boolean;
    children: ReactNode;
    to: string;
}) {
    return (
        <div className={cx('wapper')}>
            <Link to={to} className={cx('link')}>
                <button className={cx('btn') + ' ' + cx('cta-btn')}>{btn}</button>
                <Image src={img} className={cx('thumb')} />
            </Link>
            <h3 className={cx('title')}>
                <Link to="" className={cx('self')}>
                    {title}
                </Link>
            </h3>
            {role ? (
                <div className={cx('pro-icon')}>
                    <img src="/img/media/crown_icon_pro.svg" alt="" />
                </div>
            ) : (
                ''
            )}
            {children}
        </div>
    );
}

export default CoursesItem;
