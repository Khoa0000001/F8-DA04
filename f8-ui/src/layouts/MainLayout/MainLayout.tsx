import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from './Sidebar';
import Footer from '~/layouts/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
