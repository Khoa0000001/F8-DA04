import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
const cx = classNames.bind(styles);

function HeaderOnly({ children }: { children: ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default HeaderOnly;
