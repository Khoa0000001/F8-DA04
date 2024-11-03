import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './NoSearch.module.scss';
import Footer from '~/layouts/components/Footer';
import HeaderNoSearch from './Header';

const cx = classNames.bind(styles);

function NoSearch({ children }: { children: ReactNode }) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <HeaderNoSearch />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default NoSearch;
