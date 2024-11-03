import { ReactNode, MouseEvent, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VerticalModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useDispatch } from 'react-redux';
import { updateShowVerticalModalValue } from '~/store/slice';

const cx = classNames.bind(styles);
interface ShowVerticalModal {
    info: string;
    status: boolean;
}
function VerticalModal({ children, data }: { children: ReactNode; data: ShowVerticalModal }) {
    const dispath = useDispatch();
    const path = useSelector((state: RootState) => state.showVerticalModal);

    const refVerticalModal = useRef<HTMLDivElement>(null);
    const [showGoUp, setShowGoUp] = useState(false);
    const handleClosing = () => {
        dispath(updateShowVerticalModalValue({ info: data.info, status: false }));
    };
    const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
        // Ngăn chặn sự kiện lan truyền lên wrapper
        event.stopPropagation();
    };

    const handleGoUp = () => {
        if (refVerticalModal.current) {
            refVerticalModal.current.scrollTo({
                top: 0,
                behavior: 'smooth', // Thêm hiệu ứng cuộn mượt
            });
        }
    };
    const handleShowGoUp = () => {
        const valueScrollTop = refVerticalModal.current!.scrollTop;
        if (valueScrollTop >= 350) {
            setShowGoUp(true);
        } else {
            setShowGoUp(false);
        }
    };
    const handleSetClosing = () => {
        const filteredItems = path.filter((item) => {
            return item.info === data.info && item.status;
        });
        return filteredItems.length > 0;
    };
    const closing = handleSetClosing();
    return (
        <div className={cx('wrapper', { closing: !closing })} onClick={handleClosing}>
            <div className={cx('container')} onClick={handleContainerClick}>
                <div className={cx('close-btn')} onClick={handleClosing}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={cx('body')} ref={refVerticalModal} onScroll={handleShowGoUp}>
                    {children}
                </div>
                {showGoUp && (
                    <div className={cx('go-to-top-btn')} onClick={handleGoUp}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerticalModal;
