/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Mylearn.module.scss';
import Tippy from '@tippyjs/react/headless';
import MyCoursItem from '~/components/MyCoursItem';
import { Link } from 'react-router-dom';

import * as userService from '~/services/userService';
import * as check from '~/untils/check';

const cx = classNames.bind(styles);
function myLearn() {
    const [showMyLearn, setShowMyLearn] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [listRegisterCourse, setListRegisterCourse] = useState<any>([]);

    async function fetchRegisterCourse() {
        if (check.checkLogin()) {
            const result = await userService.getRegisterCourse();
            if (result.status === 200) setListRegisterCourse(result.data);
        } else {
            setListRegisterCourse([]);
        }
    }
    const handleHideMyLearn = () => {
        setShowMyLearn(false);
    };
    const handleShowMyLearn = () => {
        if (showMyLearn) {
            setShowMyLearn(false);
        } else {
            setShowMyLearn(true);
        }
    };
    useEffect(() => {
        fetchRegisterCourse();
    }, []);
    return (
        <Tippy
            interactive
            visible={showMyLearn}
            placement="bottom-end"
            render={(attrs) => (
                <ul className={'Tippy-module_wrapper' + ' ' + cx('wrapper')} tabIndex={-1} {...attrs}>
                    <div className={cx('header')}>
                        <h6 className={cx('heading')}>Khóa học của tôi</h6>
                        <Link to="" className={cx('seeMore')}>
                            Xem tất cả
                        </Link>
                    </div>
                    <div className={cx('content')}>
                        {listRegisterCourse.map((item: any, index: number) => (
                            <MyCoursItem key={index} data={item} />
                        ))}
                    </div>
                </ul>
            )}
            onClickOutside={handleHideMyLearn}
        >
            <button className={cx('myLearn')} onClick={handleShowMyLearn}>
                Khóa học của tôi
            </button>
        </Tippy>
    );
}

export default myLearn;
