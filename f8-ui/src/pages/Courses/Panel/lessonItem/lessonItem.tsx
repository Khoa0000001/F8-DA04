import classNames from 'classnames/bind';
import styles from './lessonItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LessonItem({ data, stt }: { data: any; stt: number }) {
    return (
        <div className={cx('lessonItem')}>
            <span className={cx('floatLeft', 'iconLink')}>
                <FontAwesomeIcon icon={faCirclePlay} className={cx('icon', 'video')} />
                <div className={cx('lessonName')}>
                    {stt}. {data.nameLesson}
                </div>
            </span>
            <span className={cx('floatRight')}>03:58</span>
        </div>
    );
}

export default LessonItem;
