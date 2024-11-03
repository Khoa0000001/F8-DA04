import classNames from 'classnames/bind';
import styles from './RoadMap.module.scss';
import LearningPathsItem from './LearningPathsItem';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
const dataFrontEnd = [
    {
        processed: 0,
        title: 'Kien thuc nhan mon',
        img: './public/img/courses/logo-cours-js.png',
    },
    {
        processed: 45,
        title: 'Kien thuc nhan mon',
        img: './public/img/courses/logo-cours-js.png',
    },
    {
        processed: 60,
        title: 'Kien thuc nhan mon',
        img: './public/img/courses/logo-cours-js.png',
    },
];
const dataBackEnd = [
    {
        processed: 0,
        title: 'Kien thuc nhan mon',
        img: './public/img/courses/logo-cours-js.png',
    },
    {
        processed: 50,
        title: 'Kien thuc nhan mon',
        img: './public/img/courses/logo-cours-js.png',
    },
    {
        processed: 100,
        title: 'Kien thuc nhan mon',
        img: './public/img/courses/logo-cours-js.png',
    },
];
function RoadMap() {
    return (
        <div className={cx('wapper')}>
            <div className={cx('container')}>
                <div className={cx('container-top')}>
                    <h1 className={cx('heading')}>Lộ trình học</h1>
                    <div className={cx('desc')}>
                        <p>
                            Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với
                            vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
                        </p>
                    </div>
                </div>
                <div className={cx('container-body')}>
                    <div className={cx('LearningPathsList')}>
                        <LearningPathsItem
                            title="Lộ trình học Front-end"
                            description="Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé."
                            img="https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fcategory%2FfrontEnd.png?alt=media&token=9d759216-ef58-4229-8d67-45398d9c146e"
                            to=""
                            data={dataFrontEnd}
                        />
                        <LearningPathsItem
                            title="Lộ trình học Back-end"
                            description="Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé."
                            img="https://firebasestorage.googleapis.com/v0/b/educationf8.appspot.com/o/img%2Fcategory%2FbackEnd.png?alt=media&token=2f05ea96-3d62-479a-a78a-bc65e27a8fec"
                            to=""
                            data={dataBackEnd}
                        />
                    </div>
                    <div className={cx('SuggestionBox')}>
                        <div className={cx('info')}>
                            <h2>Tham gia cộng đồng học viên F8 trên Facebook</h2>
                            <p>
                                Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và
                                hỗ trợ nhau trong quá trình học nhé.
                            </p>
                            <Button href="sdad" children="Tham gia nhóm" />
                        </div>
                        <div className={cx('image')}>
                            <Image src="/public/img/media/add-group_right.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoadMap;
