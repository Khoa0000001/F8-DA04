/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from '~/components/VideoPlayer';
import Quiz from '~/components/Quiz';

const cx = classNames.bind(styles);
function Content(props: any) {
    const showTrack = props.showTrack;
    const Data = props.data;

    const [data, setData] = useState(Data);
    const [isQuiz, setIsQuiz] = useState(data?.idQuestion);
    const [playVideo, setPlayVideo] = useState(false);
    const handlePlayVideo = () => {
        setPlayVideo(true);
    };

    function formatDate(inputDate: any) {
        const date = new Date(inputDate);
        const monthNames = [
            'tháng 1',
            'tháng 2',
            'tháng 3',
            'tháng 4',
            'tháng 5',
            'tháng 6',
            'tháng 7',
            'tháng 8',
            'tháng 9',
            'tháng 10',
            'tháng 11',
            'tháng 12',
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `Cập nhật ${month} năm ${year}`;
    }

    useEffect(() => {
        setIsQuiz(Data?.idQuestion);
        setData(Data);
        setPlayVideo(false); // Reset playVideo when component mounts or props change
    }, [Data]);
    return (
        <div className={cx('wrapper', { full_width: !showTrack })}>
            {isQuiz ? (
                <Quiz data={data} />
            ) : (
                <>
                    <div
                        className={cx('Video_wrapper', { Video_fullWidth: !showTrack })}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlayVideo();
                        }}
                    >
                        <VideoPlayer
                            children={
                                !playVideo && (
                                    <div
                                        className="react-player__preview"
                                        tabIndex={0}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center center',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundImage: `url("${data?.image}")`,
                                        }}
                                    >
                                        <div
                                            className="react-player__shadow"
                                            style={{
                                                background: 'radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)',
                                                borderRadius: '64px',
                                                width: '64px',
                                                height: '64px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <div
                                                className="react-player__play-icon"
                                                style={{
                                                    borderStyle: 'solid',
                                                    borderWidth: '16px 0px 16px 26px',
                                                    borderColor: 'transparent transparent transparent white',
                                                    marginLeft: '7px',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            }
                            id={data?.videoID}
                            onProcess={
                                props.callback && {
                                    handler: () => {
                                        props.callback();
                                    },
                                    process: 90,
                                }
                            }
                        />
                    </div>
                    <div className={cx('Video_content', { Video_fullWidth: !showTrack })}>
                        <div className={cx('contentTop')}>
                            <header>
                                <h1 className={cx('heading')}>{data?.nameLesson}</h1>
                                <p className={cx('heading_update')}>{formatDate(data.updatedAt)}</p>
                            </header>
                            <button className={cx('Video_addNote')}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span className={cx('Video_label')}>
                                    Thêm ghi chú tại <span className={cx('Video_num')}>00:00</span>
                                </span>
                            </button>
                        </div>
                        <div className={cx('MarkdownParser')}>
                            <p>
                                Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem F8 sắp có gì mới
                                nhé!
                            </p>
                            <ul>
                                <li>
                                    Fanpage:{' '}
                                    <a href="https://www.facebook.com/f8vnofficial" target="_blank" rel="noreferrer">
                                        https://www.facebook.com/f8vnofficial
                                    </a>
                                </li>
                                <li>
                                    Group:{' '}
                                    <a
                                        href="https://www.facebook.com/groups/649972919142215"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        https://www.facebook.com/groups/649972919142215
                                    </a>
                                </li>
                                <li>
                                    Youtube:{' '}
                                    <a href="https://www.youtube.com/F8VNOfficial" target="_blank" rel="noreferrer">
                                        https://www.youtube.com/F8VNOfficial
                                    </a>
                                </li>
                                <li>
                                    Đào Đức Khoa:{' '}
                                    <a href="https://www.facebook.com/WhyN0think/" target="_blank" rel="noreferrer">
                                        https://www.facebook.com/WhyN0think/
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className={cx('Powered_wrapper')}>
                        Made with <FontAwesomeIcon icon={faHeart} className={cx('Powered_heart')} />
                        <span className={cx('dot')}>·</span>
                        Powered by F8
                    </p>
                </>
            )}
        </div>
    );
}

export default Content;
