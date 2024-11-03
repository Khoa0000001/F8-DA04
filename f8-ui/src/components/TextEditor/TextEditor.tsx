/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './TextEditor.module.scss';
import MDEditor, { PreviewType, commands } from '@uiw/react-md-editor'; // Import PreviewType từ thư viện
import { useState } from 'react';

const cx = classNames.bind(styles);

function TextEditor({
    value,
    handleChange,
    height,
    preview,
    placeholder,
}: {
    value: string | undefined;
    handleChange: any;
    height: string;
    preview: PreviewType | undefined; // Sử dụng PreviewType cho prop preview
    placeholder: string;
}) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <MDEditor
                style={{
                    border: isFocused ? '2px solid #333' : '2px solid #eef4fc', // Đổi viền khi focus
                    borderRadius: '10px', // Bo góc 8px
                    transition: 'border 0.3s', // Hiệu ứng chuyển tiếp
                    backgroundColor: '#fff',
                    color: '#323c4a',
                }}
                value={value || ''} // Tránh giá trị undefined
                height={height}
                preview={preview}
                visibleDragbar={false}
                onChange={handleChange} // Sử dụng hàm callback handleChange
                onFocus={() => setIsFocused(true)} // Khi focus, thay đổi trạng thái
                onBlur={() => setIsFocused(false)} // Khi blur, trở lại trạng thái bình thường
                textareaProps={{
                    placeholder: placeholder,
                }}
                // hideToolbar={true}
                commands={[
                    commands.bold, // Lệnh in đậm
                    commands.italic, // Lệnh in nghiêng
                    commands.image,
                ]}
            />
        </div>
    );
}

export default TextEditor;
