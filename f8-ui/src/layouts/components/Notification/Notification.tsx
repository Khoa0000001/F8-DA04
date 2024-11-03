/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import MyNotification from '~/components/MyNotification';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import { NotificationIcon } from '~/components/Icons';

const cx = classNames.bind(styles);
function myLearn({ listNotification }: { listNotification: any }) {
    const [showNotification, setShowNotification] = useState(false);

    console.log('listNotification: ', listNotification);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleHideMyLearn = () => {
        setShowNotification(false);
    };
    const handleShowNotification = () => {
        if (showNotification) {
            setShowNotification(false);
        } else {
            setShowNotification(true);
        }
    };
    return (
        <Tippy
            interactive
            visible={showNotification}
            placement="bottom-end"
            render={(attrs) => (
                <ul className={'Tippy-module_wrapper' + ' ' + cx('wrapper')} tabIndex={-1} {...attrs}>
                    <div className={cx('header')}>
                        <h6 className={cx('heading')}>Thông báo</h6>
                        <Link to="" className={cx('seeMore')}>
                            Xem tất cả
                        </Link>
                    </div>
                    <div className={cx('content')}>
                        {listNotification?.map((item: any, index: number) => (
                            <MyNotification key={index} data={item} />
                        ))}
                    </div>
                </ul>
            )}
            onClickOutside={handleHideMyLearn}
        >
            <div className={cx('notification')} onClick={handleShowNotification}>
                <NotificationIcon width="20" height="20" className="" />
            </div>
        </Tippy>
    );
}

export default myLearn;
