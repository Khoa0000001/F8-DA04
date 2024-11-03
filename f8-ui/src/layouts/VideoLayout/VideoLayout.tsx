import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoLayout.module.scss';

const cx = classNames.bind(styles);

function VideoLayout({ children }: { children: ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default VideoLayout;
