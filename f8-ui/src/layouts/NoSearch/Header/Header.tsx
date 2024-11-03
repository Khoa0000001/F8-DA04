import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Config from '~/config';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import { NotificationIcon } from '~/components/Icons';
import MyLearn from '~/layouts/components/MyLearn';
import UserMenu from '~/layouts/components/UserMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);
function HeaderNoSearch() {
    const [infoUser, setInfoUser] = useState();

    async function fetchInfoUser() {
        const infoUser = await userService.infoUser();
        if (infoUser.status === 200) setInfoUser(infoUser.data);
    }

    useEffect(() => {
        fetchInfoUser();
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <div className={cx('logo')}>
                        <Link to={Config.routes.home}>
                            <img className={cx('logo-link')} src={images.logo} alt="F8" />
                        </Link>
                        <Link to="" className={cx('backHome')}>
                            <h4 className={cx('logoHeading')}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                                <span>Quay lại</span>
                            </h4>
                        </Link>
                    </div>
                </div>
                <div className={cx('actions')}>
                    <div>
                        <div className={cx('NewPost')}>
                            <Button primary className={cx('NewPost_publish-btn', 'Button_disabled')}>
                                Xuất bản
                            </Button>
                        </div>
                    </div>
                    {infoUser ? (
                        <>
                            <MyLearn />
                            <div className={cx('notification')}>
                                <NotificationIcon width="20" height="20" className="" />
                            </div>
                            <UserMenu infoUser={infoUser} />
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </header>
    );
}

export default HeaderNoSearch;
