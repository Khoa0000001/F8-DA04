/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './MyCoursItem.module.scss';
import { Link } from 'react-router-dom';
import Router from '~/config';
import timeAgo from '~/untils/timeAgo';

// import Image from '../Image';

const cx = classNames.bind(styles);
function MyCoursItem({ data }: { data: any }) {
    const course = data.courses;
    return (
        <div className={cx('course_item')}>
            <Link to={course.status ? Router.routes.learning + '?c=' + data.courseID : ''}>
                <img src={course.image || ''} className={cx('course_thumb')} />
            </Link>
            <div className={cx('course_info')}>
                <h3 className={cx('title')}>
                    <Link to={Router.routes.learning + '?c=' + data.courseID} className={cx('')}>
                        {course.nameCourse}
                    </Link>
                </h3>
                <p className={cx('last_completed')}>{timeAgo(data.createdAt)}</p>
                <div
                    className={cx('VerticalProgressBar')}
                    style={{ '--progress': `${course.process || 0}%` } as React.CSSProperties}
                ></div>
            </div>
        </div>
    );
}

export default MyCoursItem;
