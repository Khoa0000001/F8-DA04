/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Track.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faCirclePlay,
    faCircleCheck,
    faCompactDisc,
    faCircleQuestion,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Router from '~/config';
import * as learningService from '~/services/learingService';

const cx = classNames.bind(styles);
function Track({ data, studying }: { data: any; studying: any }) {
    const navigate = useNavigate();
    const _studying = studying.data;
    const course = studying.course;
    const type = () => {
        if (_studying?.idQuestion) return { type: 'question', value: Number(studying.id) };
        if (_studying?.idLesson) return { type: 'lesson', value: Number(studying.id) };
    };
    const [activeStepIndex, setActiveStepIndex] = useState<any>(type());
    const [openStepList, setOpenStepList] = useState<boolean[]>([]);

    // Tinh so lesson da hoc
    function countLearnedLessons(partCourse: any) {
        if (!partCourse || !Array.isArray(partCourse.lessons)) {
            return 0;
        }

        return partCourse.lessons.filter((lesson: any) => lesson.haveLearned === 1).length;
    }

    // fetch de lay partCourse cua id hien tai la gi de mo StepList tuowng ung
    async function fetchPartCourseID() {
        const data = { type: type()?.type, id: type()?.value };
        const result = await learningService.partCourseID(data);
        handleOpenStepList(result.data.partCourseID);
    }
    // click vao bai hoc muon hoc
    const handleActiveItem = (index: any) => {
        setActiveStepIndex(index);
        navigate(`${Router.routes.learning}?c=${course}&type=${index.type}&id=${index.value}`);
    };

    // ham thuc hien logic dong mo StepList
    const handleOpenStepList = (index: number) => {
        setOpenStepList((prevOpenStepList) => ({
            ...prevOpenStepList,
            [index]: !prevOpenStepList[index],
        }));
    };
    useEffect(() => {
        fetchPartCourseID();
    }, []);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <header className={cx('header')}>
                        <h1 className={cx('heading')}>Nội dung khóa học</h1>
                    </header>
                    <div className={cx('body')}>
                        {data.map((item: any, index: number) => (
                            <div key={item.idPartCourse}>
                                <div
                                    className={cx('TrackItem-wrapper')}
                                    onClick={() => handleOpenStepList(item.idPartCourse)}
                                >
                                    <h3 className={cx('title')}>
                                        {index + 1}. {item.namePartCourse}
                                    </h3>
                                    <span className={cx('desc')}>
                                        {countLearnedLessons(item)}/{item.lessons.length} | 21:39
                                    </span>
                                    <span className={cx('icon')}>
                                        {openStepList[item.idPartCourse] ? (
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        ) : (
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        )}
                                    </span>
                                </div>
                                <div
                                    className={cx('Track-steps-list', {
                                        open: openStepList[item.idPartCourse],
                                    })}
                                >
                                    {item.lessons.map((lesson: any, lessonIndex: number) => (
                                        <div key={lesson.idLesson}>
                                            <div
                                                className={cx(
                                                    'StepItem_wrapper',
                                                    {
                                                        active:
                                                            'lesson' === activeStepIndex.type &&
                                                            lesson.idLesson === activeStepIndex.value,
                                                    },
                                                    { StepItem_locked: !lesson.haveLearned },
                                                )}
                                                onClick={() =>
                                                    handleActiveItem({ type: 'lesson', value: lesson.idLesson })
                                                }
                                            >
                                                <div className={cx('StepItem_info')}>
                                                    <h3 className={cx('title')}>
                                                        {lessonIndex + 1}. {lesson.nameLesson}
                                                    </h3>
                                                    <p className={cx('desc')}>
                                                        {'lesson' === activeStepIndex.type &&
                                                        lesson.idLesson === activeStepIndex.value ? (
                                                            <FontAwesomeIcon
                                                                icon={faCompactDisc}
                                                                className={cx('icon', 'iconPr')}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon
                                                                icon={faCirclePlay}
                                                                className={cx('icon')}
                                                            />
                                                        )}
                                                        <span>03:15</span>
                                                    </p>
                                                </div>
                                                <div className={cx('StepItem_icon-box')}>
                                                    {lesson.haveLearned ? (
                                                        <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon={faLock}
                                                            className={cx('icon', 'StepItem_lock')}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {lesson.questions.map((question: any) => (
                                                <div
                                                    key={question.idQuestion}
                                                    className={cx(
                                                        'StepItem_wrapper',
                                                        {
                                                            active:
                                                                'question' === activeStepIndex.type &&
                                                                question.idQuestion === activeStepIndex.value,
                                                        },
                                                        { StepItem_locked: !lesson.haveLearned },
                                                    )}
                                                    onClick={() =>
                                                        handleActiveItem({
                                                            type: 'question',
                                                            value: question.idQuestion,
                                                        })
                                                    }
                                                >
                                                    <div className={cx('StepItem_info')}>
                                                        <h3 className={cx('title')}>{question.title}</h3>
                                                        <p className={cx('desc')}>
                                                            <FontAwesomeIcon
                                                                icon={faCircleQuestion}
                                                                className={cx('icon')}
                                                            />
                                                            <span>03:15</span>
                                                        </p>
                                                    </div>
                                                    <div className={cx('StepItem_icon-box')}>
                                                        {lesson.haveLearned ? (
                                                            <FontAwesomeIcon
                                                                icon={faCircleCheck}
                                                                className={cx('icon')}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon
                                                                icon={faLock}
                                                                className={cx('icon', 'StepItem_lock')}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ,
        </>
    );
}

export default Track;
