import classNames from 'classnames/bind';
import styles from './LearningPathsItem.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import Button from '~/components/Button';
import CircularProgressBar from '../CircularProgressBar';

const cx = classNames.bind(styles);
interface LearningPathsItemData {
    processed: number;
    title: string;
    img: string;
}

function LearningPathsItem({
    title,
    description,
    img,
    to,
    data,
}: {
    title: string;
    description: string;
    img: string;
    to: string;
    data: LearningPathsItemData[];
}) {
    return (
        <div className={cx('wapper')}>
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>
                        <Link to="">{title}</Link>
                    </h2>
                    <p className={cx('desc')}>{description}</p>
                </div>
                <div className={cx('thumb-wrap')}>
                    <Link to={to} className={cx('thumb-round')}>
                        <Image src={img} alt="" className={cx('thumb-img')} />
                    </Link>
                </div>
            </div>
            <div className={cx('cta')}>
                {data.map((item, index) => (
                    <CircularProgressBar key={index} progress={item.processed} title={item.title} img={item.img} />
                ))}
            </div>
            <div>
                <Button primary to={to} children="Xem chi tiết" />
            </div>
        </div>
    );
}

export default LearningPathsItem;
