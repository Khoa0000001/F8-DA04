import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Blogging.module.scss';
import TextEditor from '~/components/TextEditor';

const cx = classNames.bind(styles);
function Blogging() {
    const [valueBlog, setValueBlog] = useState<string | undefined>(''); // Khởi tạo giá trị là string hoặc undefined
    const handleChange = (newValueBlog: string | undefined) => {
        setValueBlog(newValueBlog || ''); // Tránh giá trị undefined
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('NewPost_wrapper')}>
                <div data-empty-text="Tiêu đề" className={cx('title-input')}></div>
                <div className={cx('text-editor')}>
                    <TextEditor
                        value={valueBlog}
                        handleChange={handleChange}
                        height="calc(-100px + 100vh)"
                        preview="live"
                        placeholder="Nội dung viết ở đây"
                    />
                </div>
            </div>
        </div>
    );
}

export default Blogging;
