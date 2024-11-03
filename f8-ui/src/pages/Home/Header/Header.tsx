/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation, Keyboard, A11y, Scrollbar } from 'swiper/modules';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavigationOptions } from 'swiper/types';

const cx = classNames.bind(styles);
function Header() {
    const navigationPrevRef = useRef<HTMLDivElement>(null);
    const navigationNextRef = useRef<HTMLDivElement>(null);

    return (
        <div className={cx('Slideshow_wrapper')}>
            <div className={cx('main-slider')}>
                <div className={cx('btn-navigation', 'btn-left')} ref={navigationPrevRef}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={cx('btn-navigation', 'btn-right')} ref={navigationNextRef}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard]}
                    keyboard={{
                        enabled: true,
                    }}
                    speed={1000}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    scrollbar={{ draggable: true, hide: true }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        const navigation = swiper.params.navigation as NavigationOptions;
                        if (swiper.params.navigation) {
                            navigation.prevEl = navigationPrevRef.current!;
                            navigation.nextEl = navigationNextRef.current!;
                        }
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#FD225C',
                                        background: 'linear-gradient(to right, rgb(253, 34, 92), rgb(253, 144, 4))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">Mở Bán Áo Polo F8 Đợt 2</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        Áo Polo F8 với thiết kế tối giản, lịch sự, phù hợp mặc mọi lúc, mọi nơi. Chất áo
                                        mềm mại, thoáng mát, ngực và tay áo in logo F8 - Fullstack.
                                    </p>
                                    <div>
                                        <Button href=" " children="ĐẶT ÁO NGAY" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img06.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#8828fa',
                                        background: 'linear-gradient(to right, rgb(136, 40, 250), rgb(89, 169, 250))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">Lớp Offline tại Hà Nội</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        Hình thức học Offline phù hợp nếu bạn muốn được hướng dẫn và hỗ trợ trực tiếp
                                        tại lớp. Giờ học linh hoạt, phù hợp cả sinh viên và người đi làm.
                                    </p>
                                    <div>
                                        <Button href=" " children="TƯ VẤN MIỄN PHÍ" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img07.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#6828fa',
                                        background: 'linear-gradient(to right, rgb(104, 40, 250), rgb(255, 186, 164))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">Học HTML CSS cho người mới</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là bạn có thể
                                        làm hầu hết các dự án thường gặp với ReactJS.
                                    </p>
                                    <div>
                                        <Button href=" " children="HỌC THỬ MIỄN PHÍ" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img01.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#2877FA',
                                        background: 'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">Học ReactJS Miễn Phí!</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là bạn có thể
                                        làm hầu hết các dự án thường gặp với ReactJS.
                                    </p>
                                    <div>
                                        <Button href=" " children="ĐĂNG KÝ NGAY" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img02.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#7612ff',
                                        background: 'linear-gradient(to right, rgb(118, 18, 255), rgb(5, 178, 255))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">Thành Quả của Học Viên</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc
                                        đó. Học lập trình cũng không là ngoại lệ.
                                    </p>
                                    <div>
                                        <Button href=" " children="XEM THÀNH QUẢ" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img03.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#fe215e',
                                        background: 'linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">F8 trên Youtube</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con
                                        người yêu thích lập trình F8 sẽ ở đó.
                                    </p>
                                    <div>
                                        <Button href=" " children="ĐĂNG KÝ KÊNH" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img04.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={{ width: '100%', display: 'inline-block' }}>
                            <div
                                className={cx('item')}
                                style={
                                    {
                                        '--cta-hover-color': '#2877FA',
                                        background: 'linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))',
                                    } as React.CSSProperties
                                }
                            >
                                <div className={cx('left')}>
                                    <h2 className={cx('heading')}>
                                        <a href="">F8 trên Facebook</a>
                                    </h2>
                                    <p className={cx('desc')}>
                                        F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con
                                        người yêu thích lập trình F8 sẽ ở đó.
                                    </p>
                                    <div>
                                        <Button href=" " children="THAM GIA NHÓM" className={cx('btn')} />
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <a href="">
                                        <Image src="/public/img/slide/slide_right--img05.png" className={cx('img')} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Header;
