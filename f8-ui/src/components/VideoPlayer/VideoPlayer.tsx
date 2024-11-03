/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
import { ReactNode } from 'react';
import YouTubeVideo from '~/components/YouTubeVideo';

const cx = classNames.bind(styles);

// "handler" la ham thuc hien trong <YouTubeVideo/> khi video chay dc "process" phan tram
interface OnProcess {
    handler: () => void;
    process: number;
}

interface VideoPlayerProps {
    children?: ReactNode;
    id: string;
    onProcess?: OnProcess;
}

function VideoPlayer({ children, id, onProcess }: VideoPlayerProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('player')}>
                {children || (
                    // <iframe
                    //     frameBorder="0"
                    //     allowFullScreen
                    //     src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1`}
                    //     title="YouTube video player"
                    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    //     referrerPolicy="strict-origin-when-cross-origin"
                    //     width="100%"
                    //     height="100%"
                    // ></iframe>
                    <YouTubeVideo videoId={id} onProcess={onProcess} />
                )}
            </div>
        </div>
    );
}

export default VideoPlayer;
