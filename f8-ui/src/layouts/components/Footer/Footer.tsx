import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { faYoutube, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('wapper')}>
            <section className={cx('content')}>
                <section className="row">
                    <section className="col-3">
                        <div>
                            <div className={cx('column-top')}>
                                <Link to="">
                                    <img className={cx('top-logo')} src={images.logo} alt="F8" />
                                </Link>
                                <h2 className={cx('top-slogan')}>Học Lập Trình Để Đi Làm</h2>
                            </div>
                            <p className={cx('contact-list')}>
                                Điện thoại: <a href="">0246.329.1102</a>
                                <br />
                                Email: <a href="mailto:contact@fullstack.edu.vn">contact@fullstack.edu.vn</a>
                                <br />
                                Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội
                            </p>
                            <div>
                                <a
                                    href="https://www.dmca.com/Protection/Status.aspx?id=1b325c69-aeb7-4e32-8784-a0009613323a&amp;refurl=https%3a%2f%2ffullstack.edu.vn%2f&amp;rlo=true"
                                    rel="noreferrer"
                                    title="DMCA Protected"
                                >
                                    <img className={cx('dmca')} src="/public/img/media/DMCA_protected.png" alt="DMCA" />
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className="col-2">
                        <div>
                            <h2 className={cx('heading')}>Về F8</h2>
                            <ul className={cx('list')}>
                                <li>
                                    <Link to="">Giới thiệu</Link>
                                </li>
                                <li>
                                    <Link to="">Liên hệ</Link>
                                </li>
                                <li>
                                    <Link to="">Điều khoản</Link>
                                </li>
                                <li>
                                    <Link to="">Bảo mật</Link>
                                </li>
                                <li>
                                    <Link to="">Cơ hội việc làm</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="col-2">
                        <div>
                            <h2 className={cx('heading')}>SẢN PHẨM</h2>
                            <ul className={cx('list')}>
                                <li>
                                    <Link to="">Game Nester</Link>
                                </li>
                                <li>
                                    <Link to="">Game CSS Diner</Link>
                                </li>
                                <li>
                                    <Link to="">Game CSS Selectors</Link>
                                </li>
                                <li>
                                    <Link to="">Game Froggy</Link>
                                </li>
                                <li>
                                    <Link to="">Game Froggy Pro</Link>
                                </li>
                                <li>
                                    <Link to="">Game Scoops</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="col-2">
                        <div>
                            <h2 className={cx('heading')}>CÔNG CỤ</h2>
                            <ul className={cx('list')}>
                                <li>
                                    <Link to="">Tạo CV xin việc</Link>
                                </li>
                                <li>
                                    <Link to="">Rút gọn liên kết</Link>
                                </li>
                                <li>
                                    <Link to="">Clip-path maker</Link>
                                </li>
                                <li>
                                    <Link to="">Snippet generator</Link>
                                </li>
                                <li>
                                    <Link to="">CSS Grid generator</Link>
                                </li>
                                <li>
                                    <Link to="">Cảnh báo sờ tay lên mặt</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="col-3">
                        <h2 className={cx('heading')}>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8</h2>
                        <ul className={cx('list')}>
                            <li>Mã số thuế: 0109922901</li>
                            <li>Ngày thành lập: 04/03/2022</li>
                            <li>
                                Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát triển những sản phẩm mang
                                lại giá trị cho cộng đồng.
                            </li>
                        </ul>
                    </section>
                </section>
                <section className="row">
                    <section className="col-12">
                        <div className={cx('bottom')}>
                            <p className={cx('copyright')}>
                                © 2018 - 2024 F8. Nền tảng học lập trình hàng đầu Việt Nam
                            </p>
                            <div className={cx('social-list')}>
                                <a href="" className={cx('social-item') + ' ' + cx('item-youtube')}>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                                <a href="" className={cx('social-item') + ' ' + cx('item-facebook')}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="" className={cx('social-item') + ' ' + cx('item-tiktok')}>
                                    <FontAwesomeIcon icon={faTiktok} />
                                </a>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </footer>
    );
}

export default Footer;
