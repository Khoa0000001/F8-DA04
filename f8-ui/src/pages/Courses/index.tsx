/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlay, faGaugeHigh, faFilm, faClock, faBattery } from '@fortawesome/free-solid-svg-icons';
import Panel from './Panel';
import Button from '~/components/Button';
import VideoPlayer from '~/components/VideoPlayer';
import * as courseSevice from '~/services/courseSevice';
import * as userService from '~/services/userService';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as check from '~/untils/check';
import Router from '~/config';
import formatCurrencyVND from '~/untils/formatCurrencyVND';

const cx = classNames.bind(styles);
function Courses() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>([]);
    const [showAll, setShowAll] = useState(false);
    const [showPreviewCourse, setShowPreviewCourse] = useState(false);
    const bodyElement = document.body;
    const query = new URLSearchParams(useLocation().search);

    // show tat ca lessons trong muc luc
    const handleShowAlll = () => {
        setShowAll((prevShowAll) => !prevShowAll);
    };

    // show video demo cho course
    const handleShowPreviewCourse = () => {
        setShowPreviewCourse(true);
        // Thiết lập các thuộc tính CSS cho body
        bodyElement.style.overflow = 'hidden';
        bodyElement.style.position = 'fixed';
        bodyElement.style.width = '100%';
        bodyElement.style.top = '0';
        bodyElement.style.left = '0';
    };

    // dong video demo cho course
    const handleClosePreviewCourse = () => {
        setShowPreviewCourse(false);

        bodyElement.removeAttribute('style');
    };
    // tong muc luc
    const totalChapter = course.partCourses ? course.partCourses.length : 0;
    // tong lessons
    const totalLearning = course.partCourses
        ? course.partCourses.reduce((acc: number, partCourse: any) => acc + partCourse.lessons.length, 0)
        : 0;

    // fetch data Course
    const c = query.get('c');
    async function fetchCourse() {
        const result = await courseSevice.InfoCourse(c);
        // Neu user da dang ky course nay roi thi den Learing de hoc luon
        if (check.checkLogin()) {
            const result = await userService.getRegisterCourse();
            if (result.status === 200) {
                const isCheck = result.data?.some((item: any) => item.courseID == c);
                if (isCheck) navigate(`${Router.routes.learning}?c=${c}`);
            }
        }
        if (result.status === 404) {
            toast.error('Course not found');
            return false;
        }
        setCourse(result.data);
    }

    // Ham de dang ky khoa hoc , dang ky thanh cong thi den Learing de hoc luon
    const handleRegisterCourse = async (idCourse: number) => {
        if (check.checkLogin()) {
            const result = await courseSevice.registerCourse(idCourse);
            if (result.status === 200) {
                navigate(`${Router.routes.learning}?c=${idCourse}`);
                return toast.success('Register Course');
            }
            navigate(`${Router.routes.learning}?c=${idCourse}`);
            // if (result.status === 401) return toast.error('Vui lòng đăng nhập !!!');
        }
        toast.error('Vui lòng đăng nhập !!!');
    };

    useEffect(() => {
        fetchCourse();
    }, [c]);
    return (
        <>
            <div className={cx('warpper')}>
                <div className={'row ' + cx('warpper-1')}>
                    <div className="col-8">
                        <h1 className={cx('courseName')}>{course.nameCourse}</h1>
                        <div className={cx('textContent')}>{course.description}</div>
                        <div className={cx('topicList')}>
                            <h2 className={cx('topicHeading')}>Bạn sẽ học được gì?</h2>
                            <div className={cx('whatlearn')}>
                                <ul className={cx('list')}>
                                    {course.courseResults &&
                                        course.courseResults.map((item: any, index: number) => (
                                            <li key={index}>
                                                <FontAwesomeIcon icon={faCheck} className={cx('icon')} />
                                                <span>{item.value}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className={cx('curriculumOfCourse')}>
                            <div className={cx('headerSticky')}>
                                <div className={cx('headerBlock')}>
                                    <h2>Nội dung khóa học</h2>
                                </div>
                                <div className={cx('subHeadWrapper')}>
                                    <ul>
                                        <li className={cx('hiddenMobile')}>
                                            <strong>{totalChapter} </strong> chương
                                        </li>
                                        <li className={cx('dot')}>•</li>
                                        <li>
                                            <strong>{totalLearning} </strong> bài học
                                        </li>
                                        <li className={cx('dot')}>•</li>
                                        <li>
                                            <span>
                                                Thời lượng <strong>01 giờ 34 phút</strong>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className={cx('toggleBtn')} onClick={handleShowAlll}>
                                        {showAll ? 'Thu nhỏ tất cả' : 'Mở rộng tất cả'}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('curriculumPanel')}>
                                <div>
                                    {course.partCourses &&
                                        course.partCourses.map((item: any, index: number) => (
                                            <Panel key={index} showAll={showAll} data={item} stt={index + 1} />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className={cx('purchaseBadge')}>
                            <div className={cx('imgPreview')} onClick={handleShowPreviewCourse}>
                                <div
                                    className={cx('bg')}
                                    style={{
                                        backgroundImage: `url(${course.image})`,
                                    }}
                                ></div>
                                <FontAwesomeIcon icon={faCirclePlay} className={cx('icon')} />
                                <p>Xem giới thiệu khóa học</p>
                            </div>
                            {course.price != 0 ? (
                                <div className={cx('price')}>
                                    <span className={cx('old-price')}>
                                        {course.discounts && formatCurrencyVND(parseFloat(course.price))}
                                    </span>
                                    <span className={cx('main-price')}>
                                        {course.discounts
                                            ? formatCurrencyVND(
                                                  course.price - (course.discounts?.value * course.price) / 100,
                                              )
                                            : formatCurrencyVND(parseFloat(course.price))}
                                    </span>
                                </div>
                            ) : (
                                <h5>Miễn phí</h5>
                            )}
                            <Button
                                primary={true}
                                className={cx('learnNow', { Button_disabled: !totalLearning })}
                                onClick={() => handleRegisterCourse(course.idCourse)}
                                children="ĐĂNG KÝ HỌC"
                            />
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faGaugeHigh} className={cx('icon')} />
                                    <span>Trình độ cơ bản</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faFilm} className={cx('icon')} />
                                    <span>
                                        Tổng số <strong>{totalLearning}</strong> bài học
                                    </span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faClock} className={cx('icon')} />
                                    <span>
                                        Thời lượng <strong>01 giờ 34 phút</strong>
                                    </span>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faBattery} className={cx('icon')} />
                                    <span>Học mọi lúc, mọi nơi</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showPreviewCourse && (
                <div>
                    <div className={cx('PreviewCourse')}>
                        <section className={cx('wide')}>
                            <section className={cx('row')}>
                                <section className={cx('col-12')}>
                                    <div className={cx('body')}>
                                        <div className={cx('closeBtn')} onClick={handleClosePreviewCourse}>
                                            ×
                                        </div>
                                        <h3>Giới thiệu khóa học</h3>
                                        <h2>{course.nameCourse}</h2>
                                        <VideoPlayer children={null} id={course.videoDemo} />
                                    </div>
                                </section>
                            </section>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}

export default Courses;
