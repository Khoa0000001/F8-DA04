/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
    ReadOutlined,
    YoutubeOutlined,
    LineChartOutlined,
    QuestionCircleOutlined,
    PercentageOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import classNames from 'classnames/bind';
import styles from './Sider.module.scss';
import { Link, useLocation } from 'react-router-dom';
import images from '~/assets/images';
import Config from '~/config';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    link?: string,
): MenuItem {
    return {
        key,
        icon,
        children,
        label: link ? <Link to={link}>{label}</Link> : label,
    } as MenuItem;
}

const items: MenuItem[] = [
    // getItem('Dashboard', '1', <LineChartOutlined />, undefined, Config.routes.adHome),
    getItem('Dashboard', 'sub1', <LineChartOutlined />, [
        getItem('Thống kê', '1', undefined, undefined, Config.routes.adStatistical),
        getItem('Danh sách hóa đơn', '2', undefined, undefined, Config.routes.adListBills),
    ]),
    getItem('Khóa học', 'sub2', <ReadOutlined />, [
        getItem('Khóa học', '3', undefined, undefined, Config.routes.adCourses),
        getItem('Thể loại', '4', undefined, undefined, Config.routes.adCategory),
    ]),
    getItem('Bài học', '5', <YoutubeOutlined />, undefined, Config.routes.adLessons),
    getItem('Câu hỏi', '6', <QuestionCircleOutlined />, undefined, Config.routes.adQuestions),
    getItem('Phiếu giảm giá', '7', <PercentageOutlined />, undefined, Config.routes.adDiscounts),
    getItem('Người dùng', 'sub3', <TeamOutlined />, [
        getItem('Người dùng', '8', undefined, undefined, Config.routes.adUsers),
        // getItem('Nhóm người dùng', '9', undefined, undefined, Config.routes.adGroups),
    ]),
];

const cx = classNames.bind(styles);

function AdSider({ callback }: { callback: any }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
    const [openKeys, setOpenKeys] = useState<any[]>([]);

    useEffect(() => {
        type MenuItemWithKeyAndTitle = {
            key: string;
            title: string;
        };

        const findKeyByPath = (
            path: string,
            items: MenuItem[],
            parentKeys: string[] = [],
            foundItems: MenuItemWithKeyAndTitle[] = [],
        ): { key: string | undefined; openKeys: string[]; foundItems: MenuItemWithKeyAndTitle[] } => {
            for (const item of items) {
                if (isMenuItemType(item) && item.label.props?.to === path) {
                    foundItems.push({ key: item.key as string, title: item.label.props.children as string });
                    return { key: item.key as string, openKeys: parentKeys, foundItems };
                }
                if (hasChildren(item)) {
                    const result = findKeyByPath(
                        path,
                        item.children,
                        [...parentKeys, item.key as string],
                        [...foundItems, { key: item.key as string, title: item.label as string }],
                    );
                    if (result.key) return result;
                }
            }
            return { key: undefined, openKeys: [], foundItems };
        };

        // được sử dụng để kiểm tra xem một đối tượng có phải là một mục menu hợp lệ không.
        const isMenuItemType = (item: MenuItem): item is MenuItem & { label: { props: { to: string } } } => {
            return (item as any).label !== undefined && (item as any).label.props !== undefined;
        };
        // kiểm tra xem một mục menu có chứa các mục con (children) va (label) hay không.
        const hasChildren = (
            item: MenuItem,
        ): item is MenuItem & { children: MenuItem[]; label: { props: { to: string } } } => {
            return Array.isArray((item as any).children);
        };

        const currentPath = location.pathname;
        const { key: currentKey, openKeys: currentOpenKeys, foundItems } = findKeyByPath(currentPath, items);
        if (currentKey) {
            callback(foundItems);
            setSelectedKeys([currentKey]);
            setOpenKeys(currentOpenKeys);
        }
    }, [location, collapsed]);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className={cx('logo')}>
                <Link to="">
                    <img className={cx('logo-link')} src={images.logo} alt="F8" />
                </Link>
                {!collapsed && <h4 className={cx('logoHeading', { collapsed: collapsed })}>Nền tảng học lập trình</h4>}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys)}
                items={items}
            />
        </Sider>
    );
}

export default AdSider;
