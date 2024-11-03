/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '../Search';
import Config from '~/config';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import MyLearn from '../MyLearn';
import Notification from '../Notification';
import UserMenu from '../UserMenu';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';
import * as check from '~/untils/check';
import * as notificationService from '~/services/notificationService';

import socket from '~/services/socketIoServer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cx = classNames.bind(styles);

function Header() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [infoUser, setInfoUser] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [listNotification, setListNotification] = useState<any>([]);

    useEffect(() => {
        if (infoUser) {
            socket.emit('register', infoUser.idUser);
        }
    }, [infoUser]);

    async function fetchInfoUser() {
        const infoUser = await userService.infoUser();
        if (infoUser.status === 200) setInfoUser(infoUser.data);
    }

    async function fetchNotification() {
        const listNotifi = await notificationService.ListNotification();
        setListNotification(listNotifi.data);
    }

    useEffect(() => {
        if (check.checkLogin()) {
            fetchInfoUser();
            fetchNotification();
        }
        socket.on('receiveNotification', (notification) => {
            setListNotification((prev: any) => {
                return [...prev, notification];
            });
        });
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={Config.routes.home}>
                        <img className={cx('logo-link')} src={images.logo} alt="F8" />
                    </Link>
                    <h4 className={cx('logoHeading')}>Học Lập Trình Để Đi Làm</h4>
                </div>
                <div className={cx('search')}>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    {infoUser ? (
                        <>
                            <MyLearn />
                            <Notification listNotification={listNotification} />
                            <UserMenu infoUser={infoUser} />
                        </>
                    ) : (
                        <>
                            <Link to={Config.routes.login}>
                                <button className={cx('NavBar_loginBtn')}>Đăng nhập</button>
                            </Link>
                            <Link to={Config.routes.register}>
                                <button className={cx('NavBar_registerBtn')}>Đăng ký</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
