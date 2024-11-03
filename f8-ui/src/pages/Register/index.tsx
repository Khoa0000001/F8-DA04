/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Config from '~/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import * as userService from '~/services/userService';
import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const [customErrors, setCustomErrors] = useState<any>({});

    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .required('Yêu cầu')
                .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})$/, 'Sai kiểu số điện thoại'),
            password: Yup.string()
                .required('Yêu cầu')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,19}$/,
                    'Tối thiểu 8 và tối đa 19 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null || ''], 'Mật khẩu phải trùng khớp')
                .required('Yêu cầu'),
        }),
        onSubmit: async (values) => {
            // Handle form submission
            const check = await userService.checkPhoneExists({
                params: {
                    numberPhone: values.phone,
                },
            });
            if (check.status === 200 && check.data.messege === 'exist') {
                setCustomErrors({ ...customErrors, phone: 'Số điện thoại đã tồn tại' });
            } else {
                setCustomErrors({ ...customErrors, phone: '' });
                await authService.register({
                    numberPhone: values.phone,
                    password: values.password,
                });
                toast.success('Đăng ký thành công <3');
                navigate(Config.routes.login);
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
                        {formik.touched.phone && (formik.errors.phone || customErrors.phone) && (
                            <p className={cx('errorMsg')}>*{formik.errors.phone || customErrors.phone}</p>
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
                    <div className={cx('bottom')}>
                        <div className={cx('bottom_content')}>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm password ..."
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className={cx('errorMsg')}>*{formik.errors.confirmPassword}</p>
                        )}
                    </div>
                    <button type="submit" className={cx('formbody-btn')}>
                        <span>Đăng ký</span>
                    </button>
                </form>
            </div>
            <div className={cx('signing')}>
                <span>Bạn đã có tài khoản? </span>
                <Link to={Config.routes.login} className={cx('link_signing')}>
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}

export default Register;
