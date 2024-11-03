/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
interface OnProcess {
    handler: () => void;
    process: number;
}

const YouTubeVideo = ({ videoId, onProcess }: { videoId: any; onProcess?: OnProcess }) => {
    const playerRef = useRef<any | null>(null);
    const intervalRef = useRef<any | null>(null);
    // const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const onYouTubeIframeAPIReady = () => {
            playerRef.current = new (window as any).YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };

        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }

        return () => {
            // Clean up the interval when the component unmounts
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [videoId]);

    const onPlayerReady = (event: any) => {
        event.target.playVideo();
    };

    const onPlayerStateChange = (event: any) => {
        if (event.data === (window as any).YT.PlayerState.PLAYING) {
            if (onProcess) {
                intervalRef.current = setInterval(() => {
                    if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                        const currentTime = playerRef.current.getCurrentTime();
                        const duration = playerRef.current.getDuration();
                        // setCurrentTime(currentTime);
                        console.log(currentTime);
                        if (onProcess.process > 100) onProcess.process = 100;
                        if (currentTime >= (onProcess.process / 100) * duration) {
                            console.log('xong');
                            onProcess.handler();
                            // Clear the interval after logging
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                    }
                }, 1000);
            }
        } else {
            // Clear the interval when the video is paused or stopped
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div id="player"></div>
        </div>
    );
};

export default YouTubeVideo;
