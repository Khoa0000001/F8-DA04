/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFile, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useDispatch } from 'react-redux';
import { updateShowVerticalModalValue } from '~/store/slice';
import Router from '~/config';

const cx = classNames.bind(styles);
function Header({ data }: { data: any }) {
    const dispath = useDispatch();
    const hanleShowNote = () => {
        dispath(updateShowVerticalModalValue({ info: 'Note', status: true }));
    };
    const progress = Math.floor(data.process) || 0;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back-btn')}>
                <FontAwesomeIcon icon={faChevronLeft} className={cx('icon')} />
            </div>
            <Link to={Router.routes.home} className={cx('logo')}>
                <Image src="./public/img/media/logo_f8.png" />
            </Link>
            <div className={cx('cours-title')}>{data.nameCourse}</div>
            <div className={cx('actions')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('wrapper')} style={{ '--progress': progress } as React.CSSProperties}>
                        <div className={cx('pie', { 'over-half': progress > 50 })}>
                            <div className={cx('left-side', 'half-circle')}></div>
                            {progress > 50 && <div className={cx('right-side', 'half-circle')}></div>}
                        </div>
                        <div className={cx('shadow')}></div>
                        <div className={cx('body')}>
                            <div className={cx('Header_percent')}>
                                <span className={cx('Header_num')}>{progress}</span>%
                            </div>
                        </div>
                    </div>
                    <p className={cx('completed-msg')}>
                        <strong>
                            <span className={cx('Header_num')}>{data.learnedLessonsCount}</span>/
                            <span className={cx('Header_num')}>{data.totalLessons} </span>
                        </strong>
                        bài học
                    </p>
                </div>
                <button className={cx('action-btn')} onClick={hanleShowNote}>
                    <FontAwesomeIcon icon={faFile} className={cx('icon')} />
                    <span className={cx('label')}>Ghi chú</span>
                </button>
                <button className={cx('action-btn', 'help-btn')}>
                    <FontAwesomeIcon icon={faCircleQuestion} className={cx('icon')} />
                    <span className={cx('label')}>Hướng dẫn</span>
                </button>
            </div>
        </div>
    );
}

export default Header;
