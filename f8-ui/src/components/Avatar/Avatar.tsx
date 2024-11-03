import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function Avatar({ src, fontSize }: { src: string; fontSize: string }) {
    return (
        <div className={cx('wrapper')} style={{ '--font-size': fontSize } as React.CSSProperties}>
            <Image src={src} className={cx('avatar')} alt="" />
        </div>
    );
}

export default Avatar;
