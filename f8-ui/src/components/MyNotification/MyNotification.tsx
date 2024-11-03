import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MyNotification.module.scss';
import { Link } from 'react-router-dom';
import Avatar from '~/components/Avatar';
import Router from '~/config';
import * as lessonService from '~/services/lessonService';
import * as questionService from '~/services/questionService';

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyNotification({ data }: { data: any }) {
    const [route, setRoute] = useState<string>(''); // Khởi tạo state để lưu route
    useEffect(() => {
        console.log('data', data);
        async function getRouter() {
            switch (data.notificationTypeID) {
                case 1: {
                    const cl = await lessonService.getRouterNotification(data.id);
                    setRoute(
                        cl ? `${Router.routes.learning}?c=${cl.data.idCourse}&type=lesson&id=${cl.data.idLesson}` : '',
                    );
                    break;
                }
                case 3: {
                    const cq = await questionService.getRouterNotification(data.id);
                    setRoute(
                        cq
                            ? `${Router.routes.learning}?c=${cq.data.idCourse}&type=question&id=${cq.data.idQuestion}`
                            : '',
                    );
                    break;
                }
                default:
                    setRoute('');
                    break;
            }
        }

        getRouter();
    }, [data]); // Chỉ gọi lại useEffect khi 'data' thay đổi

    return (
        <Link to={route}>
            <div className={cx('notification_item')}>
                <div className={cx('avatar')}>
                    <Avatar src={data.users.avatar || ''} fontSize="4.7px" />
                </div>
                <div className={cx('massage')}>
                    <div>
                        <strong>{data.users.name}</strong> đã nhắc tới bạn trong một bình luận.
                    </div>
                    <div className={cx('createTime')}>một năm trước</div>
                </div>
            </div>
        </Link>
    );
}

export default MyNotification;
