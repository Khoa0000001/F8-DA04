import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Row, theme } from 'antd';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import * as check from '~/untils/check';
import Cookies from 'js-cookie';
import Config from '~/config';

const { Header } = Layout;

const cx = classNames.bind(styles);

function AdHeader() {
    const navigate = useNavigate();
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
            if (Cookies.get('jwt')) {
                Cookies.remove('jwt');
            }
            Cookies.set('login', '0');
            navigate(Config.routes.login);
        }
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row justify="end">
                <Col style={{ marginRight: 24 }}>
                    <Tippy
                        interactive
                        visible={showMenu}
                        placement="bottom-end"
                        render={(attrs) => (
                            <ul className={'Tippy-module_wrapper' + ' ' + cx('wrapper')} tabIndex={-1} {...attrs}>
                                <div className={cx('user')}>
                                    <div className={cx('avatar')}>
                                        <Avatar size={56} icon={<UserOutlined />} />
                                    </div>
                                    <div className={cx('info')}>
                                        <span>Daokhoaanlien</span>
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
                        <div
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={handleShowMenu}
                        >
                            <Avatar size="default" icon={<UserOutlined />} />
                            <span style={{ marginLeft: 8 }}>Daokhoa</span>
                        </div>
                    </Tippy>
                </Col>
            </Row>
        </Header>
    );
}

export default AdHeader;
