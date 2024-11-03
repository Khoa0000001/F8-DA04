/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import React, { ReactNode, useState } from 'react';

import { Breadcrumb, Layout, theme } from 'antd';

import Header from './Header';
import Sidebar from './Sider';
import Footer from './Footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

function AdminLayout({ children }: { children: ReactNode }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const callback = (value: any) => {
        setBreadcrumbItems(value);
    };

    return (
        <Layout style={{ minHeight: '100vh' }} className={cx('wrapper')}>
            <Sidebar callback={callback} />
            <Layout>
                <Header />
                <Breadcrumb style={{ margin: '16px 0px 16px 23px' }} items={breadcrumbItems} />
                <Content style={{ margin: '0 16px' }} className={cx('content')}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100%',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
