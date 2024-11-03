import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './Poppy.module.scss';

const cx = classNames.bind(styles);

function Wrapprt({ children, className }: { children: ReactNode; className: string }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapprt;
