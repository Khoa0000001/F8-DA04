/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import VerticalModal from '../VerticalModal';
// import { useDispatch } from 'react-redux';
// import { updateShowVerticalModalValue } from '~/store/slice';
import Avatar from '~/components/Avatar';
import DetailComment from '~/components/DetailComment';
import TextEditor from '~/components/TextEditor';
import * as commentService from '~/services/commentService';
import { useLocation } from 'react-router-dom';
import * as userService from '~/services/userService';

import socket from '~/services/socketIoServer';

const cx = classNames.bind(styles);
interface ShowVerticalModal {
    info: string;
    status: boolean;
}

function Comment({ info }: { info: ShowVerticalModal }) {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const type = query.get('type');

    const [activeCommentId, setActiveCommentId] = useState<number | null>(null); // Trạng thái lưu ID của comment chính có TextEditor đang mở
    const [activeRepCommentId, setActiveRepCommentId] = useState<number | null>(null); // Trạng thái lưu ID của repcomment có TextEditor đang mở

    const [infoUser, setInfoUser] = useState<any>();

    async function fetchInfoUser() {
        const infoUser = await userService.infoUser();
        if (infoUser.status === 200) setInfoUser(infoUser.data);
    }

    const handleShowTextEditorCon = (id: number) => {
        setActiveCommentId((prevId) => (prevId === id ? null : id));
        setActiveRepCommentId(null);
    };

    const handleShowRepTextEditor = async (repCmtId: number) => {
        setActiveRepCommentId((prevRepId) => (prevRepId === repCmtId ? null : repCmtId));
        setActiveCommentId(null);
    };

    const handleCloseTextEditor = () => {
        setActiveCommentId(null);
        setActiveRepCommentId(null);
    };

    const [valueComment, setValueComment] = useState<string>(''); // Khởi tạo giá trị là string hoặc undefined

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chat, setChat] = useState<any>([]); // Mảng chứa các tin nhắn

    async function fetchListCmt() {
        const result = await commentService.getListCmt({ commentTypeID: type == 'lesson' ? 1 : 3, id: id });
        result && setChat(result.data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function cmt(value: any) {
        const data = {
            value: value,
            commentTypeID: type == 'lesson' ? 1 : 3,
            id: Number(id),
        };
        await commentService.addCmt(data);
    }

    useEffect(() => {
        fetchListCmt();
        fetchInfoUser();
        // Nhận tin nhắn từ server
        socket.on('receiveMessage', () => {
            fetchListCmt();
        });

        // Hủy lắng nghe sự kiện khi component bị unmount
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = async () => {
        if (valueComment.trim()) {
            await cmt(valueComment);
            socket.emit('sendMessage'); // Gửi tin nhắn lên server
            handleClosingTextEditor();
        }
    };

    const [showTextEditor, setShowTextEditor] = useState(false);
    const handleShowTextEditor = () => {
        setShowTextEditor(true);
    };
    const handleClosingTextEditor = () => {
        setValueComment('');
        setShowTextEditor(false);
    };

    const handleChange = (newValueComment: string | undefined) => {
        setValueComment(newValueComment || ''); // Tránh giá trị undefined
    };

    return (
        <VerticalModal
            children={
                <div className={cx('wrapper')}>
                    <div className={cx('contentHeading')}>
                        <div>
                            <h4>Hỏi đáp</h4>
                            <p className={cx('help')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
                        </div>
                    </div>
                    <div className={cx('commentWrapper')}>
                        <div className={cx('avatarWrapper')}>
                            <Avatar src={infoUser?.avatar || ''} fontSize="4.2px" />
                        </div>
                        <div className={cx('commentContent')}>
                            {showTextEditor ? (
                                <>
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
                                        <button className={cx('ok', { active: valueComment })} onClick={sendMessage}>
                                            Bình luận
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className={cx('placeholder')} onClick={handleShowTextEditor}>
                                    <span>Bạn có thắc mắc gì trong bài học này?</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {chat?.map((cmt: any) => (
                        <DetailComment
                            key={cmt.idComment}
                            infoUser={cmt.users}
                            user={infoUser}
                            cmt={cmt.value}
                            idCmt={cmt.idComment}
                            activeCommentId={activeCommentId}
                            activeRepCommentId={activeRepCommentId}
                            onShowTextEditor={() => handleShowTextEditorCon(cmt.idComment)}
                            onShowRepTextEditor={handleShowRepTextEditor} // Truyền hàm onShowRepTextEditor
                            onCloseTextEditor={handleCloseTextEditor}
                        />
                    ))}
                </div>
            }
            data={info}
        />
    );
}

export default Comment;
