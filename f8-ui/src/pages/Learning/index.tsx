/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Learning.module.scss';
import Header from './Header';
import Track from './Track';
import Content from './Content';
import ActionBar from './ActionBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import Comment from '~/components/VerticalModal/Comment';
import Note from '~/components/VerticalModal/Note';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowVerticalModalValue } from '~/store/slice';
import { RootState } from '~/store/store';
import * as learningService from '~/services/learingService';
import * as check from '~/untils/check';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Learning() {
    const dispath = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const path = useSelector((state: RootState) => state.showVerticalModal);
    const query = new URLSearchParams(useLocation().search);

    // Xem <Comment> va <Note> duoc mount va unmount vao dom
    const commentStatus = path.find((item) => item.info === 'Comment' && item.status === true) || false;
    const noteStatus = path.find((item) => item.info === 'Note' && item.status === true) || false;

    const [showTrack, setShowTrack] = useState(true);
    let nextLesson: any;

    // callback de su ly viec an/hien <Track/>
    const handleCallback = (showTrack: boolean) => {
        setShowTrack(showTrack);
    };

    // de hien view <Comment/>
    const hanleShowComment = () => {
        dispath(updateShowVerticalModalValue({ info: 'Comment', status: true }));
    };
    const [course, setCourse] = useState<any | null>(null);

    // callback cua Content dung cho ham onProcess cua <VideoPlayer/>
    const handle = async () => {
        if (check.checkLogin()) {
            await learningService.addProcess({
                lessonId: nextLesson.idLesson,
            });
        }
        fetchCourse();
    };

    // fetch data tong quan cua ca <header> va <track>
    async function fetchCourse() {
        const c = query.get('c');
        if (check.checkLogin()) {
            const result = await learningService.Course_Lesson(c);
            if (result.status === 200) {
                setCourse(result.data);
            }
            if (result.status === 404) {
                toast.error('Course not found');
            }
        } else toast.error('Not login');
    }

    //data cua <Context/>
    const [lesson_question, setLesson_Question] = useState<any | null>(null);

    const id = query.get('id');
    const c = query.get('c');
    const type = query.get('type');

    // fetch lesson ma user dang hoc den trong course nay va them len url = id
    // Neu co roi thi lay ra data cua lesson hoac question dua vao type
    async function studyingLesson() {
        if (check.checkLogin()) {
            let result: any;
            if (id === null) {
                // Lan dau vao "tu coures --> learning"
                result = await learningService.studyingLesson(c);
                if (result.status === 200) {
                    searchParams.set('type', 'lesson');
                    searchParams.set('id', result.data.idLesson);
                    setSearchParams(searchParams);
                }
                if (result.status === 404) {
                    toast.error('Course not found');
                }
            } else {
                // Lan sau vao "<Track/> --> learning "
                if (type === 'lesson') {
                    result = await learningService.infoLesson(id);
                }
                if (type === 'question') {
                    result = await learningService.infoQuestion(id);
                }

                if (result.status === 200) {
                    setLesson_Question({ data: result.data, course: c, id: id });
                }
                if (result.status === 404) {
                    toast.error('Course not found');
                }
            }
        } else toast.error('Not login');
    }

    // check xem co phai phan tu cuoi chua bi khoa va lay phan tu tiep theo de add Process
    const handleCheckLastLesson = () => {
        const data = course.partCourses;

        //lay lesson tiep theo tinh tu id dang xem
        function getNextLesson(idLesson: any, data: any) {
            for (let i = 0; i < data.length; i++) {
                const partCourse = data[i];
                for (let j = 0; j < partCourse.lessons.length; j++) {
                    const lesson = partCourse.lessons[j];
                    if (lesson.idLesson === idLesson) {
                        if (j + 1 < partCourse.lessons.length) {
                            return partCourse.lessons[j + 1];
                        } else if (i + 1 < data.length) {
                            // If there's no next lesson in the current part, check the next part
                            const nextPartCourse = data[i + 1];
                            if (nextPartCourse.lessons.length > 0) {
                                return nextPartCourse.lessons[0];
                            }
                        }
                    }
                }
            }
            return null; // Return null if there's no next lesson
        }
        nextLesson = getNextLesson(Number(id), data);
        if (nextLesson?.haveLearned === 0) {
            return true;
        } else {
            return false;
        }
    };
    useEffect(() => {
        fetchCourse();
    }, [c]);
    useEffect(() => {
        studyingLesson();
    }, [id, type]);
    return course && lesson_question ? (
        <>
            <div className={cx('wrapper')}>
                <Header data={course} />
                {showTrack && <Track data={course.partCourses} studying={lesson_question} />}
                <Content
                    showTrack={showTrack}
                    data={lesson_question.data}
                    callback={handleCheckLastLesson() ? handle : undefined}
                />
                <ActionBar callback={handleCallback} data={lesson_question.data} />
                <div className={cx('Main_comment-btn', { 'show-track': showTrack })} onClick={hanleShowComment}>
                    <button className={cx('ActionButton')}>
                        <FontAwesomeIcon icon={faComments} />
                        <span className={cx('title')}>Hỏi đáp</span>
                    </button>
                </div>
            </div>
            <div>
                {noteStatus && <Note info={{ info: 'Note', status: false }} />}
                {commentStatus && <Comment info={{ info: 'Comment', status: false }} />}
            </div>
        </>
    ) : (
        <div>Loading...</div>
    );
}

export default Learning;
