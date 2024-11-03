import classNames from 'classnames/bind';
import styles from './BtnNews.module.scss';
import { NewFeed } from '~/components/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);
function BtnNews() {
    return (
        <Tippy content="Bảng Tin F8" placement="top">
            <div className={cx('wapper')}>
                <button className={cx('btn')}>
                    <span className={cx('icon')}>
                        <NewFeed />
                    </span>
                </button>
            </div>
        </Tippy>
    );
}

export default BtnNews;
