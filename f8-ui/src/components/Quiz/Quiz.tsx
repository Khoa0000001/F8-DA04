/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Quiz.module.scss';
import Button from '~/components/Button';
import { toast } from 'react-toastify';

import * as learningService from '~/services/learingService';
import * as check from '~/untils/check';

const cx = classNames.bind(styles);

function Quiz({ data }: { data: any }) {
    const [answer, setAnswer] = useState<number | null>();
    const handleAnswer: any = (id: number) => {
        setAnswer(id);
    };

    const handleAnswerSubmit = async () => {
        if (check.checkLogin()) {
            const result = await learningService.checkAnswer(answer);
            if (result.data.messege == 'Untrue') toast.warning('Không đúng !!');
            if (result.data.messege == 'Exactly') toast.success('Chính xác <3');
        }
    };
    useEffect(() => {
        setAnswer(null);
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <h1 className={cx('heading')}>{data.title}</h1>
                <p className={cx('updated')}>Cập nhật tháng 6 năm 2024</p>
            </header>
            <div className={cx('desc')}>
                <div
                    className={cx('MarkdownParser_wrapper')}
                    style={{ fontSize: '1.6rem', lineHeight: 2 } as React.CSSProperties}
                >
                    <div className={cx('Quiz_content')}>
                        <div className={cx('Quiz_content-wrap')}>
                            <p>{data.value}</p>
                        </div>
                    </div>
                    <p>Chọn câu trả lời đúng.</p>
                </div>
            </div>
            <div className={cx('Quiz_content')}>
                {data.answers.map((item: any, index: number) => (
                    <div
                        key={index}
                        className={cx('Quiz_answer', { Quiz_selected: answer === item.idAnswer })}
                        onClick={() => handleAnswer(item.idAnswer)}
                    >
                        {item.value}
                    </div>
                ))}
            </div>
            <div className={cx('Quiz_footer')}>
                <Button
                    className={cx('Quiz_submit', { Button_disabled: !answer })}
                    primary
                    onClick={handleAnswerSubmit}
                >
                    Trả lời
                </Button>
            </div>
        </div>
    );
}

export default Quiz;
