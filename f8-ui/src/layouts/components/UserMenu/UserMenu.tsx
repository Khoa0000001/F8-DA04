import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserMenu.module.scss';
import Tippy from '@tippyjs/react/headless';
import Avatar from '~/components/Avatar';
import { Link } from 'react-router-dom';
import * as check from '~/untils/check';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserMenu({ infoUser }: any) {
    const [showMenu, setShowMenu] = useState(false);

    const handleHideMenu = () => {
        setShowMenu(false);
    };
    const handleShowMenu = () => {
        if (showMenu) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    };
    const handleExit = () => {
        if (check.checkLogin()) {
            Cookies.remove('jwt');
            Cookies.remove('login');
            window.location.reload();
        }
    };
    return (
        <Tippy
            interactive
            visible={showMenu}
            placement="bottom-end"
            render={(attrs) => (
                <ul className={'Tippy-module_wrapper' + ' ' + cx('wrapper')} tabIndex={-1} {...attrs}>
                    <div className={cx('user')}>
                        <div className={cx('avatar')}>
                            <Avatar src={infoUser.avatar || ''} fontSize="5.6px" />
                        </div>
                        <div className={cx('info')}>
                            <span>{infoUser.name}</span>
                            <div className={cx('username')}>{infoUser.userName}</div>
                        </div>
                    </div>
                    <hr />
                    <ul className={cx('list')}>
                        <li>
                            <Link to="" className={cx('item')}>
                                Trang cá nhân
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <ul className={cx('list')}>
                        <li>
                            <Link to="" className={cx('item')}>
                                Viết blog
                            </Link>
                        </li>
                        <li>
                            <Link to="" className={cx('item')}>
                                Bài viết của tôi
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <ul className={cx('list')}>
                        <li>
                            <Link to="" className={cx('item')}>
                                Bài viết đã lưu
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <ul className={cx('list')}>
                        <li>
                            <Link to="" className={cx('item')}>
                                Cài đặt
                            </Link>
                        </li>
                        <li>
                            <div className={cx('item')} onClick={handleExit}>
                                Đăng xuất
                            </div>
                        </li>
                    </ul>
                </ul>
            )}
            onClickOutside={handleHideMenu}
        >
            <div className={cx('avatar')} onClick={handleShowMenu}>
                <Avatar src={infoUser.avatar || ''} fontSize="3.2px" />
            </div>
        </Tippy>
    );
}

export default UserMenu;
