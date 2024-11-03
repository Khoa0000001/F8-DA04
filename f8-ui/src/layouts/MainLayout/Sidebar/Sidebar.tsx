import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHouse, faRoad, faNewspaper, faPen } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import SidebarItem from '~/components/SidebarItem';
import { Link, useNavigate } from 'react-router-dom';
import BtnNews from '~/components/BtnNews';

import Config from '~/config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Sidebar() {
    const [showAddBlog, setShowAddBlog] = useState(false);
    const [activeItem, setActiveItem] = useState('Trang chủ');
    const navigate = useNavigate();

    const handleItemClick = (title: string) => {
        setActiveItem(title);
    };
    const handleHideAddBlog = () => {
        setShowAddBlog(false);
    };
    const handleShowAddBlog = () => {
        if (showAddBlog) {
            setShowAddBlog(false);
        } else {
            setShowAddBlog(true);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenAddBlog = (e: any) => {
        e.preventDefault();
        if (Cookies.get('login') === '1') {
            navigate(Config.routes.blogging);
        } else {
            toast.error('Vui lòng đăng nhập !!!');
        }
    };
    return (
        <aside className={cx('sidebarWrap')}>
            <div className={cx('wrapper')}>
                <div>
                    <Tippy
                        interactive
                        visible={showAddBlog}
                        placement="bottom-end"
                        render={(attrs) => (
                            <ul className={'Tippy-module_wrapper' + ' ' + cx('tippy_wrapper')} tabIndex={-1} {...attrs}>
                                <li>
                                    <Link to="" onClick={handleOpenAddBlog}>
                                        <em>
                                            <FontAwesomeIcon icon={faPen} />
                                        </em>
                                        <span>Viết blog</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                        onClickOutside={handleHideAddBlog}
                    >
                        <div
                            className={cx('add_blog-btn') + ' ' + cx(showAddBlog ? 'add_blog-open' : '')}
                            onClick={handleShowAddBlog}
                        >
                            <FontAwesomeIcon icon={faPlus} className={cx('add_blog-icon')} />
                        </div>
                    </Tippy>
                </div>
                <ul className={cx('list')}>
                    <SidebarItem
                        title="Trang chủ"
                        href={Config.routes.home}
                        className={activeItem == 'Trang chủ' ? 'active' : ''}
                        icon={<FontAwesomeIcon icon={faHouse} />}
                        onItemClick={handleItemClick}
                    />
                    <SidebarItem
                        title="Lộ trình"
                        href={Config.routes.roadmap}
                        className={activeItem == 'Lộ trình' ? 'active' : ''}
                        icon={<FontAwesomeIcon icon={faRoad} />}
                        onItemClick={handleItemClick}
                    />
                    <SidebarItem
                        title="Bài viết"
                        href={Config.routes.blog}
                        className={activeItem == 'Bài viết' ? 'active' : ''}
                        icon={<FontAwesomeIcon icon={faNewspaper} />}
                        onItemClick={handleItemClick}
                    />
                </ul>
            </div>
            <BtnNews />
        </aside>
    );
}

export default Sidebar;
