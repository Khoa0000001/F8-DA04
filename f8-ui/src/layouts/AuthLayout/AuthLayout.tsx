import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';
import { ReactNode } from 'react';
import Config from '~/config';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('coatings')}></div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <Link to={Config.routes.home}>
                            <img className={cx('logo-link')} src={images.logo} alt="F8" />
                        </Link>
                        <h1>Đăng nhập vào F8</h1>
                    </div>
                    <div className={cx('body')}>{children}</div>
                    <div className={cx('footer')}>
                        <span>Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với</span>
                        <span>
                            <a href="">Điều khoản sử dụng </a>
                            của chúng tôi.
                        </span>
                    </div>
                </div>
                <div className={cx('about')}>
                    <div className={cx('about-content')}>
                        <a href="">Giới thiệu về F8</a>
                        <span>|</span>
                        <a href="">F8 trên Youtube</a>
                        <span>|</span>
                        <a href="">F8 trên Facebook</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
