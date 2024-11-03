import classNames from 'classnames/bind';
import styles from './Note.module.scss';
import VerticalModal from '../VerticalModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { updateShowVerticalModalValue } from '~/store/slice';

const cx = classNames.bind(styles);
interface ShowVerticalModal {
    info: string;
    status: boolean;
}

function Note({ info }: { info: ShowVerticalModal }) {
    // const dispath = useDispatch();
    // useEffect(() => {
    //     dispath(updateShowVerticalModalValue(info));
    // }, []);
    return (
        <VerticalModal
            children={
                <div className={cx('wrapper')}>
                    <ul className={cx('list')}>
                        <header className={cx('header')}>
                            <h2 className={cx('bigHeading')}>Ghi chú của tôi</h2>
                            <div>
                                <select className={cx('selectable')}>
                                    <option value="chapter">Trong chương hiện tại</option>
                                    <option value="course">Trong tất cả các chương</option>
                                </select>
                                <select className={cx('selectable')}>
                                    <option value="latest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>
                        </header>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                        <li className={cx('item')}>
                            <div className={cx('itemHead')}>
                                <div className={cx('itemTime')}>00:00</div>
                                <div className={cx('titleWrap')}>
                                    <div className={cx('itemTitle')}>Object constructor</div>
                                    <div className={cx('itemTrackTitle')}>Làm việc với object</div>
                                </div>
                                <div className={cx('itemCtrl')}>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={cx('itemCtrlBtn')}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('itemContent')}>
                                <p>Note</p>
                            </div>
                        </li>
                    </ul>
                </div>
            }
            data={info}
        />
    );
}

export default Note;
