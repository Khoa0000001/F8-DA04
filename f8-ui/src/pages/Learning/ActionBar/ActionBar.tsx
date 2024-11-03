/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ActionBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ActionBar(props: any) {
    const [showTrack, setShowTrack] = useState(true);
    const dataLesson = props.data;
    const handleShowTrack = () => {
        const newShowTrack = !showTrack; // Lấy giá trị mới của showTrack
        setShowTrack(newShowTrack); // Cập nhật state icon
        props.callback(newShowTrack); // Truyền giá trị mới lên phần tử cha
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>BÀI TRƯỚC</span>
            </button>
            <button className={cx('btn', 'primary', 'disabled')}>
                <span>BÀI TIẾP THEO</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <div className={cx('toggle-wrap')}>
                <h3 className={cx('track-title')}>{dataLesson.nameLesson || dataLesson.title}</h3>
                <button className={cx('toggle-btn')} onClick={handleShowTrack}>
                    {showTrack ? <FontAwesomeIcon icon={faArrowRight} /> : <FontAwesomeIcon icon={faBars} />}
                </button>
            </div>
        </div>
    );
}

export default ActionBar;
