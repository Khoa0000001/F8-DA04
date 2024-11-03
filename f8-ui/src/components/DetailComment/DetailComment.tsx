/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './DetailComment.module.scss';
import Avatar from '~/components/Avatar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import TextEditor from '~/components/TextEditor';
import * as commentService from '~/services/commentService';
import Cookies from 'js-cookie';

import { useLocation } from 'react-router-dom';
import socket from '~/services/socketIoServer';

const cx = classNames.bind(styles);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DetailComment({
    infoUser,
    cmt,
    idCmt,
    user,
    activeCommentId,
    activeRepCommentId,
    onShowTextEditor,
    onShowRepTextEditor,
    onCloseTextEditor,
}: {
    infoUser: any;
    cmt: string;
    idCmt: number;
    user: any;
    activeCommentId: number | null;
    activeRepCommentId: number | null;
    onShowTextEditor: () => void;
    onShowRepTextEditor: (repCmtId: number) => void;
    onCloseTextEditor: () => void;
}) {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const type = query.get('type');

    const [valueComment, setValueComment] = useState<string>(''); // Khởi tạo giá trị là string hoặc undefined
    const [isRepCmt, setIsRepCmt] = useState<number>();
    const [numberRepCmt, setNumberRepCmt] = useState<number>();
    const [litsRepCmt, setListRepCmt] = useState<any>([]);

    function handleTlCmt() {
        onShowTextEditor();
        setValueComment('@' + infoUser.name + ' ');
    }

    function handleTlCmtRep(idComment: number, nameUser: string) {
        onShowRepTextEditor(idComment);
        setValueComment('@' + nameUser + ' ');
    }

    const handleClosingTextEditor = () => {
        onCloseTextEditor();
        setValueComment('');
    };

    const handleChange = (newValueComment: string | undefined) => {
        setValueComment(newValueComment || '');
    };
    async function repCmt(idCmt: number) {
        const result = await commentService.getListRepCmt(idCmt);
        setListRepCmt(result?.data);
    }
    async function handleSeeMore(idCmt: number) {
        repCmt(idCmt);
        setIsRepCmt(0);
    }
    async function seeMore() {
        const result = await commentService.getListRepCmt(idCmt);
        setIsRepCmt(result.data?.length);
    }
    async function seeNumberRepCmt() {
        const result = await commentService.getListRepCmt(idCmt);
        setNumberRepCmt(result.data?.length);
    }
    useEffect(() => {
        seeMore();
        seeNumberRepCmt();
        socket.on('receiveMessage', () => {
            repCmt(idCmt);
            seeNumberRepCmt();
        });

        // Hủy lắng nghe sự kiện khi component bị unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function cmtr(value: any, parentId: number | null) {
        const data = {
            value: value,
            commentTypeID: type == 'lesson' ? 1 : 3,
            id: Number(id),
            parentId: parentId,
        };
        await commentService.addCmt(data);
    }

    const sendMessage = async (parentId: number | null, IDuser: number) => {
        const toUser = IDuser;
        if (valueComment.trim()) {
            await cmtr(valueComment, parentId);
            socket.emit('sendMessage'); // Gửi tin nhắn lên server
            handleClosingTextEditor();
            if (user.idUser != IDuser)
                socket.emit('sendNotification', {
                    toUser,
                    notification: {
                        type: type == 'lesson' ? 1 : 3,
                        id,
                        name: user.name,
                        avatar: user.avatar,
                        jwt: Cookies.get('jwt'),
                        userID: user.idUser,
                    },
                });
        }
    };
    return (
        <>
            <div className={cx('detailComment')}>
                <div className={cx('avatarWrap')}>
                    <Link to="">
                        <div className={cx('avatarWrapper')}>
                            <Avatar src={infoUser.avatar || ''} fontSize="4.3px" />
                        </div>
                    </Link>
                </div>
                <div className={cx('commentBody')}>
                    <div className={cx('commentInner')}>
                        <div className={cx('commentWrapper')}>
                            <div className={cx('commentContent')}>
                                <div className={cx('commentContentHeading')}>
                                    <Link to="">
                                        <span className={cx('commentAuthor')}>{infoUser.name}</span>
                                    </Link>
                                </div>
                                <div className={cx('commentText')}>
                                    <div className={cx('contentText')}>
                                        <p>{cmt}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('commentTime')}>
                                <div className={cx('createdAt')}>
                                    <div className={cx('createdAtLeft')}>
                                        {activeCommentId === idCmt ? (
                                            <div className={cx('commentContentRep')}>
                                                <TextEditor
                                                    value={valueComment}
                                                    handleChange={handleChange}
                                                    height="auto"
                                                    preview="edit"
                                                    placeholder="Bạn có thức mắc gì?"
                                                />
                                                <div className={cx('actionWrapper')}>
                                                    <button className={cx('cancel')} onClick={handleClosingTextEditor}>
                                                        Hủy
                                                    </button>
                                                    <button
                                                        className={cx('ok', { active: valueComment })}
                                                        onClick={() => {
                                                            sendMessage(idCmt, infoUser.idUser);
                                                        }}
                                                    >
                                                        Bình luận
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <button className={cx('iconWrapper')}>
                                                    <span className={cx('likeComment')}>Thích</span>
                                                </button>
                                                ·
                                                <div className={cx('placeholder')}>
                                                    <span
                                                        className={cx('replyComment')}
                                                        onClick={() => {
                                                            handleTlCmt();
                                                        }}
                                                    >
                                                        Trả lời
                                                    </span>
                                                </div>
                                                <div className={cx('createdAtRight')}>
                                                    <span className={cx('createdAtDotRight')}> · </span>
                                                    <span className={cx('time')}>một tháng trước</span>
                                                    <span className={cx('moreBtnWrapper')}>
                                                        <span className={cx('createdAtDotRight')}> · </span>
                                                        <button className={cx('moreBtn')}>
                                                            <FontAwesomeIcon icon={faEllipsis} />
                                                        </button>
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isRepCmt != 0 ? (
                <div
                    className={cx('seeMore')}
                    onClick={() => {
                        handleSeeMore(idCmt);
                    }}
                >
                    <samp>Xem {numberRepCmt} câu trả lời</samp>
                </div>
            ) : (
                <div className={cx('detailRepCommnet')}>
                    {litsRepCmt?.map((cmt: any) => (
                        <div key={cmt.idComment} className={cx('detailComment', 'replyMore')}>
                            <div className={cx('avatarWrap')}>
                                <Link to="">
                                    <div className={cx('avatarWrapper')}>
                                        <Avatar src={cmt?.users.avatar || ''} fontSize="4.3px" />
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('commentBody')}>
                                <div className={cx('commentInner')}>
                                    <div className={cx('commentWrapper')}>
                                        <div className={cx('commentContent')}>
                                            <div className={cx('commentContentHeading')}>
                                                <Link to="">
                                                    <span className={cx('commentAuthor')}>{cmt?.users.name}</span>
                                                </Link>
                                            </div>
                                            <div className={cx('commentText')}>
                                                <div className={cx('contentText')}>
                                                    <p>{cmt.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('commentTime')}>
                                            <div className={cx('createdAt')}>
                                                <div className={cx('createdAtLeft')}>
                                                    {activeRepCommentId === cmt.idComment ? (
                                                        <div className={cx('commentContentRep')}>
                                                            <TextEditor
                                                                value={valueComment}
                                                                handleChange={handleChange}
                                                                height="auto"
                                                                preview="edit"
                                                                placeholder="Bạn có thức mắc gì?"
                                                            />
                                                            <div className={cx('actionWrapper')}>
                                                                <button
                                                                    className={cx('cancel')}
                                                                    onClick={handleClosingTextEditor}
                                                                >
                                                                    Hủy
                                                                </button>
                                                                <button
                                                                    className={cx('ok', { active: valueComment })}
                                                                    onClick={() => {
                                                                        sendMessage(idCmt, cmt?.userID);
                                                                    }}
                                                                >
                                                                    Bình luận
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button className={cx('iconWrapper')}>
                                                                <span className={cx('likeComment')}>Thích</span>
                                                            </button>
                                                            ·
                                                            <div className={cx('placeholder')}>
                                                                <span
                                                                    className={cx('replyComment')}
                                                                    onClick={() =>
                                                                        handleTlCmtRep(cmt.idComment, cmt?.users.name)
                                                                    }
                                                                >
                                                                    Trả lời
                                                                </span>
                                                            </div>
                                                            <div className={cx('createdAtRight')}>
                                                                <span className={cx('createdAtDotRight')}> · </span>
                                                                <span className={cx('time')}>một tháng trước</span>
                                                                <span className={cx('moreBtnWrapper')}>
                                                                    <span className={cx('createdAtDotRight')}> · </span>
                                                                    <button className={cx('moreBtn')}>
                                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default DetailComment;
