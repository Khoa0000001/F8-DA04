import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '~/services/authService';
import Cookies from 'js-cookie';

import Config from '~/config';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required('Yêu cầu')
                .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})$/, 'Sai kiểu số điện thoại'),
            password: Yup.string().required('Yêu cầu'),
        }),
        onSubmit: async (values) => {
            // Handle form submission
            try {
                const result = await authService.login({
                    numberPhone: values.phone,
                    password: values.password,
                });

                console.log(result);

                if (result?.status === 200 && result.data.type === 'success') {
                    toast.success('Đăng nhập thành công <3');
                    Cookies.set('login', '1', { expires: 30 }); // Cookie expires in 30 days
                    const authentication = await authService.authentication();
                    console.log('Authentication login', authentication);
                    if (authentication.data.role.keyRole === 1) navigate(Config.routes.adStatistical); // Điều hướng về trang chủ
                    if (authentication.data.role.keyRole === 2) navigate(Config.routes.home); // Điều hướng về trang chủ
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('formbody')}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className={cx('top_title')}>
                            <label>Số điện thoại</label>
                            <label>Đăng nhập với email</label>
                        </div>
                        <div className={cx('inputSDT')}>
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className={cx('errorMsg')}>*{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('bottom_content')}>
                            <input
                                id="password"
                                name="password"
                                placeholder="Password ..."
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className={cx('errorMsg')}>*{formik.errors.password}</p>
                        )}
                    </div>
                    <button type="submit" className={cx('formbody-btn')}>
                        <span>Đăng nhập</span>
                    </button>
                </form>
            </div>
            <div className={cx('signing')}>
                <span>Bạn chưa có tài khoản? </span>
                <Link to={Config.routes.register} className={cx('link_signing')}>
                    Đăng ký
                </Link>
            </div>
        </div>
    );
}

export default Login;
