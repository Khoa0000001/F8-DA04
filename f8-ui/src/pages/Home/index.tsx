/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';
import CoursesItem from '~/components/CoursesItem';
import ScrollListHeader from './ScrollListHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faEye, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import { useContext, useEffect, useState } from 'react';
import * as homeService from '~/services/homeService';
import * as userService from '~/services/userService';
import Router from '~/config';
import formatCurrencyVND from '~/untils/formatCurrencyVND';
import * as check from '~/untils/check';

const dataBlogs = [
    {
        idBlog: 1,
        title: 'Tổng hợp các sản phẩm của học viên tại F8',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_01.png?alt=media&token=0dbc11bd-4622-4d2b-8e33-9e0cbe780498',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 2,
        title: '[Phần 1] Tạo dự án ReactJS với Webpack và Babel',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_02.jpg?alt=media&token=2f6ed5d2-1080-494c-b769-014d5c44cafd',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 3,
        title: 'Cách đưa code lên GitHub và tạo GitHub Pages',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_03.png?alt=media&token=644f1605-b1c5-4d1a-83b7-5cb66b81e932',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 4,
        title: 'Ký sự ngày thứ 25 học ở F8 ',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_04.png?alt=media&token=b031688c-0a31-4a0b-8dba-ea5b453fa6c2',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 5,
        title: 'Các nguồn tài nguyên hữu ích cho 1 front-end developer',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_05.png?alt=media&token=f29ce555-21fb-442f-977a-2626a2877821',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 6,
        title: 'Thời gian và Động lực',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_06.jpg?alt=media&token=76e13965-0828-4ef3-9dd1-9c926ca011ef',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 7,
        title: 'Tổng hợp tài liệu tự học tiếng anh cơ bản.',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_07.png?alt=media&token=61e96128-dc19-47f9-a76e-03c265a18707',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
    {
        idBlog: 8,
        title: 'Học như thế nào là phù hợp ?',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fimageblogs%2Fpost_08.jpg?alt=media&token=5b28a3b3-2e83-4050-a49d-addad939c7ea',
        user: {
            name: 'User-YpaDN',
            avatar: '',
        },
        createdAt: '',
        updatedAt: '',
    },
];

const dataVideos = [
    {
        idLesson: 1,
        nameLesson: 'Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_01.jpg?alt=media&token=6f4d50fa-23a8-4a1c-965d-5735821ce48a',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 2,
        nameLesson: 'Phương pháp học lập trình của Admin F8?',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_02.jpg?alt=media&token=27d1f886-1f8a-4aed-818b-e95fd76f09a0',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 3,
        nameLesson: '"Code Thiếu Nhi Battle" Tranh Giành Trà Sữa Size L',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_03.jpg?alt=media&token=6f37d259-dc66-461a-860d-649e6ae43abb',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 4,
        nameLesson: 'Bạn sẽ làm được gì sau khóa học?',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_04.jpg?alt=media&token=713cde12-072d-477d-b1ca-124475bae414',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 5,
        nameLesson: 'Javascript có thể làm được gì? Giới thiệu qua về trang F8 | Học lập trình Javascript cơ bản',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_05.jpg?alt=media&token=cf3eb7c4-5122-4c6c-8791-935630801d74',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 6,
        nameLesson: 'ReactJS là gì? Tại sao nên học ReactJS?',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_06.jpg?alt=media&token=c54bbb08-a3f7-4b4b-bbc2-3bbeaf7936a9',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 7,
        nameLesson: 'Làm sao để có thu nhập cao và đi xa hơn trong ngành IT?',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_07.jpg?alt=media&token=a924d707-09e8-44bc-b758-131fb836e3b8',
        createdAt: '',
        updatedAt: '',
    },
    {
        idLesson: 8,
        nameLesson: 'Các thẻ HTML thông dụng',
        image: 'https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Flessons%2Fimg_vd_08.jpg?alt=media&token=abe07d32-d29e-46e9-8073-eb68e362810e',
        createdAt: '',
        updatedAt: '',
    },
];

const cx = classNames.bind(styles);
function Home() {
    const [listCourseFree, setListCourseFree] = useState<any>([]);
    const [listCourseMoney, setListCourseMoney] = useState<any>([]);
    const [listRegisterCourse, setListRegisterCourse] = useState<any>([]);
    const [listBlog, setListBlog] = useState<any>(dataBlogs);
    const [listVideo, setListVideo] = useState<any>(dataVideos);

    // fetch courses mien phi
    async function fetchCourseFree() {
        const result = await homeService.ListCourseFree();
        setListCourseFree(result.data);
    }
    // fetch courses mat phi
    async function fetchCourseMoney() {
        const result = await homeService.ListCourseMoney();
        setListCourseMoney(result.data);
    }

    // fetch courses ma user da dang ky
    async function fetchRegisterCourse() {
        if (check.checkLogin()) {
            const result = await userService.getRegisterCourse();
            if (result.status === 200) setListRegisterCourse(result.data);
        } else {
            setListRegisterCourse([]);
        }
    }

    // Check neu course da dang ky thi dua den Learing hoc luon
    const handlecheckRegisterCourse = (idCourse: number) => {
        const isCheck = listRegisterCourse?.some((item: any) => item.courseID == idCourse);
        if (isCheck) {
            return Router.routes.learning + '?c=' + idCourse;
        } else {
            return Router.routes.courses + '?c=' + idCourse;
        }
    };

    useEffect(() => {
        fetchRegisterCourse();
        fetchCourseFree();
        fetchCourseMoney();
    }, []);
    return (
        <div className={cx('wapper')}>
            <div className={cx('slideshow')}>
                <Header />
            </div>
            <div className={cx('content')}>
                {/* Khoa học pro */}
                <div className={cx('ScrollList')}>
                    <div>
                        <div className={cx('heading-wrap')}>
                            <div className={cx('heading')}>
                                <span>
                                    Khóa học Pro
                                    <span className={cx('label')}>Mới</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className="row">
                            {listCourseMoney.map((item: any, index: number) => (
                                <div className="col-3" key={index}>
                                    <CoursesItem
                                        to={handlecheckRegisterCourse(item.idCourse)}
                                        img={item.image || ''}
                                        btn="Xem khóa học"
                                        title={item.nameCourse}
                                        role={true}
                                        children={
                                            <div className="price">
                                                <span className={cx('old-price')}>
                                                    {item.discounts && formatCurrencyVND(parseFloat(item.price))}
                                                </span>
                                                <span className={cx('main-price')}>
                                                    {item.discounts
                                                        ? formatCurrencyVND(
                                                              item.price - (item.discounts.value * item.price) / 100,
                                                          )
                                                        : formatCurrencyVND(parseFloat(item.price))}
                                                </span>
                                            </div>
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Khoa học miễn phí */}
                <div className={cx('ScrollList')}>
                    <ScrollListHeader
                        userNumber={393.154}
                        title="Khóa học miễn phí"
                        viewmore="Xem lộ trình"
                        hrefView={Router.routes.roadmap}
                    />
                    <div className={cx('body')}>
                        <div className="row">
                            {listCourseFree.map((item: any, index: number) => (
                                <div className="col-3" key={index}>
                                    <CoursesItem
                                        to={handlecheckRegisterCourse(item.idCourse)}
                                        img={item.image || ''} //
                                        btn="Xem khóa học"
                                        title={item.nameCourse} //
                                        role={false}
                                    >
                                        <div className={cx('students-count')}>
                                            <FontAwesomeIcon icon={faUsers} />
                                            <span>{item.participantsCount.toLocaleString('vi-VN')}</span>
                                        </div>
                                    </CoursesItem>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Bài viết nổi bật */}
                <div className={cx('ScrollList')}>
                    <ScrollListHeader
                        userNumber={null}
                        title="Bài viết nổi bật"
                        viewmore="Xem tất cả"
                        hrefView={Router.routes.blog}
                    />
                    <div className={cx('body')}>
                        <div className="row">
                            {listBlog.map((item: any, index: number) => (
                                <div key={index} className="col-3">
                                    <CoursesItem
                                        to=""
                                        img={item.image}
                                        btn="Xem bài viết"
                                        title={item.title}
                                        role={false}
                                        children={
                                            <div className={cx('author')}>
                                                <Link to="" className={cx('avatar-wrapper')}>
                                                    <Avatar src={item.user.avatar} fontSize="2.9px" />
                                                </Link>
                                                <Link to="">
                                                    <span className={cx('user-name')}>{item.user.name}</span>
                                                    <span className={cx('dot')}>.</span>
                                                    <span>4 phút đọc</span>
                                                </Link>
                                            </div>
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Videos nổi bật */}
                <div className={cx('ScrollList')}>
                    <ScrollListHeader userNumber={null} title="Videos nổi bật" viewmore="Xem tất cả" hrefView="" />
                    <div className={cx('body')}>
                        <div className="row">
                            {listVideo.map((item: any, index: number) => (
                                <div key={index} className="col-3">
                                    <CoursesItem
                                        to=""
                                        img={item.image}
                                        btn="Xem video"
                                        title={item.nameLesson}
                                        role={false}
                                        children={
                                            <div className={cx('stats')}>
                                                <div>
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span>247.640</span>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={faThumbsUp} />
                                                    <span>247.640</span>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={faComment} />
                                                    <span>247.640</span>
                                                </div>
                                            </div>
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
