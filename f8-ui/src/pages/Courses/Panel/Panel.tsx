/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './Panel.module.scss';
import LessonItem from './lessonItem/lessonItem';

const cx = classNames.bind(style);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Panel({ showAll, data, stt }: { showAll: boolean; data: any; stt: number }) {
    const [activePanel, setActivePanel] = useState(showAll);
    // Thiết lập activePanel dựa trên showAll khi showAll thay đổi
    useEffect(() => {
        setActivePanel(showAll);
    }, [showAll]);
    const handleShowLessonItem = () => {
        setActivePanel((prevActivePanel) => !prevActivePanel);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('panelHeading', { activePanel: activePanel })} onClick={handleShowLessonItem}>
                <h5 className={cx('panelTitle')}>
                    <div className={cx('headline')}>
                        <span className={cx('floatLeft', 'groupName')}>
                            <strong>
                                {stt}.{data.namePartCourse}
                            </strong>
                        </span>
                        <span className={cx('floatRight', 'timeOfSection')}>{data.lessons.length} bài học</span>
                    </div>
                </h5>
            </div>
            <div className={cx('collapse', { in: activePanel })}>
                <div className={cx('panelBody')}>
                    <div>
                        {data.lessons &&
                            data.lessons.map((item: any, index: number) => (
                                <LessonItem key={index} data={item} stt={index + 1} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Panel;
