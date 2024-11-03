import classNames from 'classnames/bind';
import styles from './CircularProgressBar.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);
function CircularProgressBar({ progress, title, img }: { progress: number; title: string; img: string }) {
    return (
        <Tippy content={title} placement="top">
            <div className={cx('wrapper')} style={{ '--progress': progress } as React.CSSProperties}>
                <div className={cx('pie', { 'over-half': progress > 50 })}>
                    <div className={cx('left-side', 'half-circle')}></div>
                    {progress > 50 && <div className={cx('right-side', 'half-circle')}></div>}
                </div>
                <div className={cx('shadow')}></div>
                <div className={cx('body')}>
                    <Link to="" style={{ '--progress': `grayscale(${100 - progress}%)` } as React.CSSProperties}>
                        <Image src={img} />
                    </Link>
                </div>
            </div>
        </Tippy>
    );
}

export default CircularProgressBar;
