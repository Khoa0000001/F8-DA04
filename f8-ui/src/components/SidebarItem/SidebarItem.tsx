import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function SidebarItem({
    title,
    href,
    className,
    icon,
    onItemClick,
}: {
    title: string;
    href: string;
    className: string;
    icon: ReactNode;
    onItemClick: (title: string) => void;
}) {
    return (
        <li onClick={() => onItemClick(title)}>
            <Link to={href} className={cx('itemBtn') + ' ' + cx(className)}>
                {icon}
                <span>{title}</span>
            </Link>
        </li>
    );
}

export default SidebarItem;
