/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Questions.module.scss';
import {
    Button,
    Col,
    Divider,
    Drawer,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Space,
    Switch,
    Table,
    Tooltip,
    message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import moment from 'moment';
import * as questionService from '~/services/questionService';
import * as courseSevice from '~/services/courseSevice';
import * as lessonService from '~/services/lessonService';
import * as answerService from '~/services/answerService';

const cx = classNames.bind(styles);
function Questions() {
    const [listQuestionTable, setListQuestionTable] = useState<any | null>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
    const [listCourse, setListCourse] = useState<any | null>([]);
    const [listLesson, setListLesson] = useState<any | null>([]);
    const [selectedLesson, setSelectedLesson] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(0);

    async function fetchListQuestionTable(data: any) {
        const rules = await questionService.getQuestionTable(data);
        setListQuestionTable(rules.data);
    }

    async function fetchListCourse() {
        const rules = await courseSevice.listCourseStatus1();
        setListCourse(rules.data);
    }
    async function fetchListLesson(id: any) {
        const rules = await lessonService.listLessonStatus1(id);
        setListLesson(rules.data);
    }

    const handleCourseChange = async (courseID: number) => {
        fetchListLesson(courseID);
        setSelectedCourse(courseID);
        setSelectedLesson(0);
        fetchListQuestionTable({
            idCourse: courseID,
            idLesson: 0,
        });
    };

    const handleLessonChange = async (lessonID: number) => {
        setSelectedLesson(lessonID);
        fetchListQuestionTable({
            idCourse: 0,
            idLesson: lessonID,
        });
    };
    ////////////////////////////////
    // Question
    const [listCourse_Q, setListCourse_Q] = useState<any | null>([]);
    const [listLesson_Q, setListLesson_Q] = useState<any | null>([]);
    const [formQuestion] = Form.useForm();
    const [openQuestion, setOpenQuestion] = useState(false);
    const [modeQuestion, setModeQuestion] = useState<'add' | 'edit'>('add');
    const [editingRecordQuestion, setEditingRecordQuestion] = useState<any>(null);

    async function fetchListCourse_Q() {
        const rules = await courseSevice.listCourseStatus1();
        setListCourse_Q(rules.data);
    }
    async function fetchListLesson_Q(id: any) {
        const rules = await lessonService.listLessonStatus1(id);
        setListLesson_Q(rules.data);
    }

    const handleCourseChange_Q = async (courseID: number) => {
        fetchListLesson_Q(courseID);
        formQuestion.setFieldsValue({ lessonID: null });
    };

    const showDrawerQuestion = (mode: 'add' | 'edit', record?: any) => {
        fetchListCourse_Q();
        fetchListLesson_Q(0);
        setModeQuestion(mode);
        if (mode === 'edit' && record) {
            setEditingRecordQuestion(record);
            formQuestion.setFieldsValue({ ...record });
        }
        setOpenQuestion(true);
    };

    const onCloseQuestion = () => {
        setOpenQuestion(false);
        formQuestion.resetFields();
        setEditingRecordQuestion(null);
    };

    const handleSubmitQuestion = () => {
        formQuestion
            .validateFields()
            .then((values) => {
                submitDataQuestion(values);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const submitDataQuestion = async (values: any) => {
        let response;
        if (modeQuestion === 'add') {
            delete values.course;
            response = await questionService.addQuestion(values);
        } else {
            const data = {
                ...values,
                idQuestion: editingRecordQuestion.idQuestion,
            };
            response = await questionService.updateQuestion(data);
        }

        if (response?.status === 200) {
            message.success(`${modeQuestion === 'add' ? 'Tạo' : 'Cập nhật'} câu hỏi thành công`);
            formQuestion.resetFields();
            fetchListQuestionTable({
                idCourse: selectedCourse,
                idLesson: selectedLesson,
            });
            onCloseQuestion();
        } else {
            message.error(`${modeQuestion === 'add' ? 'Tạo' : 'Cập nhật'} câu hỏi thất bại`);
        }
    };

    const handleDeleteQuestion = (record: any) => {
        console.log(record);
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa câu hỏi này không?',
            async onOk() {
                const deleteQuestion = await questionService.deleteQuestion(record.idQuestion);
                if (deleteQuestion.status === 200) {
                    fetchListQuestionTable({
                        idCourse: selectedCourse,
                        idLesson: selectedLesson,
                    });
                    message.success(`Xóa câu hỏi thành công`);
                } else {
                    message.error(`Xóa câu hỏi thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa câu hỏi đã bị hủy bỏ.');
            },
        });
    };

    const confirmSwitchChangeQuestion = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa câu hỏi này không? ',
            onOk: () => handleSwitchChangeQuestion(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChangeQuestion = async (id: any, newValue: any) => {
        const rules = await questionService.setStatus({
            idQuestion: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa câu hỏi thành công`);
            } else {
                message.warning(`Bạn đã khóa câu hỏi thành công`);
            }
            fetchListQuestionTable({
                idCourse: selectedCourse,
                idLesson: selectedLesson,
            });
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa câu hỏi thất bại`);
            } else {
                message.error(`Bạn đã khóa câu hỏi thất bại`);
            }
        }
    };
    ////////////////////////////////
    // Answer
    const [formAnsWer] = Form.useForm();
    const [question, setQuestion] = useState<any | null>(null);
    const [openAnsWer, setOpenAnsWer] = useState(false);
    const [modeAnsWer, setModeAnsWer] = useState<'add' | 'edit'>('add');
    const [editingRecordAnsWer, setEditingRecordAnsWer] = useState<any>(null);
    const showDrawerAnsWer = (mode: 'add' | 'edit', record?: any) => {
        setModeAnsWer(mode);
        setQuestion(record);
        if (mode === 'edit' && record) {
            setEditingRecordAnsWer(record);
            formAnsWer.setFieldsValue({ ...record });
        }
        setOpenAnsWer(true);
    };

    const onCloseAnsWer = () => {
        setOpenAnsWer(false);
        formAnsWer.resetFields();
        setEditingRecordAnsWer(null);
    };

    const handleSubmitAnsWer = () => {
        formAnsWer
            .validateFields()
            .then((values) => {
                submitDataAnsWer(values);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const submitDataAnsWer = async (values: any) => {
        let response;
        if (modeAnsWer === 'add') {
            const data = {
                questionID: question.idQuestion,
                ...values,
            };
            response = await answerService.addAnswer(data);
        } else {
            const data = {
                ...values,
                idAnswer: editingRecordAnsWer.idAnswer,
            };
            response = await answerService.updateAnswer(data);
        }

        if (response?.status === 200) {
            message.success(`${modeAnsWer === 'add' ? 'Tạo' : 'Cập nhật'} câu trả lời thành công`);
            formAnsWer.resetFields();
            fetchListQuestionTable({
                idCourse: selectedCourse,
                idLesson: selectedLesson,
            });
            onCloseAnsWer();
        } else {
            message.error(`${modeAnsWer === 'add' ? 'Tạo' : 'Cập nhật'} câu trả lời thất bại`);
        }
    };

    const handleDeleteAnsWer = (record: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa trả lời này không?',
            async onOk() {
                const deleteAnswer = await answerService.deleteAnswer(record.idAnswer);
                if (deleteAnswer.status === 200) {
                    fetchListQuestionTable({
                        idCourse: selectedCourse,
                        idLesson: selectedLesson,
                    });
                    message.success(`Xóa trả lời thành công`);
                } else {
                    message.error(`Xóa trả lời thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa trả lời đã bị hủy bỏ.');
            },
        });
    };

    const confirmSwitchChangeAnsWer = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa câu trả lời này không? ',
            onOk: () => handleSwitchChangeAnsWer(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChangeAnsWer = async (id: any, newValue: any) => {
        const rules = await answerService.setStatus({
            idAnswer: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa câu trả lời thành công`);
            } else {
                message.warning(`Bạn đã khóa câu trả lời thành công`);
            }
            fetchListQuestionTable({
                idCourse: selectedCourse,
                idLesson: selectedLesson,
            });
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa câu trả lời thất bại`);
            } else {
                message.error(`Bạn đã khóa câu trả lời thất bại`);
            }
        }
    };
    //table
    const columnsQuestion = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_text: any, _record: any, index: number) => <span style={{ fontWeight: 600 }}>{index + 1}</span>,
        },
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        { title: 'Câu hỏi', dataIndex: 'value', key: 'value' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (text: any, record: any) => (
                <Switch
                    checked={text === 1}
                    onChange={(checked) => {
                        if (text === 1 && !checked) {
                            // Nếu trạng thái thay đổi từ 1 về 0, hiển thị confirm
                            confirmSwitchChangeQuestion(record.idQuestion, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChangeQuestion(record.idQuestion, checked);
                        }
                    }}
                />
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center' as const,
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center' as const,
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Tooltip placement="top" title={<span>Thêm câu trả lời cho câu hỏi này</span>}>
                        <Button type="default" onClick={() => showDrawerAnsWer('add', record)}>
                            Thêm
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title={<span>Sửa câu hỏi này</span>}>
                        <Button type="primary" onClick={() => showDrawerQuestion('edit', record)}>
                            Sửa
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title={<span>Xóa câu hỏi này</span>}>
                        <Button danger onClick={() => handleDeleteQuestion(record)}>
                            Xóa
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const columnsAnswer = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center' as const,
            render: (_text: any, _record: any, index: number) => index + 1,
        },
        { title: 'Câu trả lời', dataIndex: 'value', key: 'value' },
        {
            title: 'Sai / đúng',
            dataIndex: 'correctAnswer',
            key: 'correctAnswer',
            align: 'center' as const,
            render: (text: any) => <div>{text ? 'Đúng' : 'Sai'}</div>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center' as const,
            render: (text: any, record: any) => (
                <Switch
                    checked={text === 1}
                    onChange={(checked) => {
                        if (text === 1 && !checked) {
                            // Nếu trạng thái thay đổi từ 1 về 0, hiển thị confirm
                            confirmSwitchChangeAnsWer(record.idAnswer, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChangeAnsWer(record.idAnswer, checked);
                        }
                    }}
                />
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center' as const,
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center' as const,
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawerAnsWer('edit', record)}>
                        Sửa
                    </Button>
                    <Button danger onClick={() => handleDeleteAnsWer(record)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record: any) => {
        return (
            <Table
                dataSource={record.answers}
                columns={columnsAnswer}
                className={cx('tableQuestion')}
                rowKey="idAnswer"
                pagination={false}
            />
        );
    };

    const onExpand = (expanded: boolean, record: any) => {
        setExpandedRowKeys(expanded ? [record.idQuestion] : []);
    };
    //
    useEffect(() => {
        fetchListQuestionTable({
            idCourse: 0,
            idLesson: 0,
        });
        fetchListCourse();
        fetchListLesson(0);
    }, []);
    return (
        <div>
            {/* header */}
            <div className={cx('header')}>
                <Button
                    className={cx('addQuestion')}
                    onClick={() => showDrawerQuestion('add')}
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    Thêm câu hỏi
                </Button>
                <div className={cx('search')}>
                    <Select
                        className={cx('searchCourse')}
                        placeholder="Vui lòng chọn khóa học ..."
                        defaultValue={0}
                        onChange={handleCourseChange}
                        value={selectedCourse}
                        options={[
                            { value: 0, label: 'Tất cả' },
                            ...listCourse.map((item: any) => ({
                                value: item.idCourse,
                                label: item.nameCourse,
                            })),
                        ]}
                    />
                    <Select
                        className={cx('searchLesson')}
                        placeholder="Vui lòng chọn bài học ..."
                        defaultValue={0}
                        onChange={handleLessonChange}
                        value={selectedLesson}
                        options={[
                            { value: 0, label: 'Tất cả' },
                            ...listLesson.map((item: any) => ({
                                value: item.idLesson,
                                label: item.nameLesson,
                            })),
                        ]}
                    />
                </div>
            </div>
            {/* tables */}
            <div>
                <Divider orientation="left">Câu hỏi</Divider>
                <Table
                    dataSource={listQuestionTable}
                    columns={columnsQuestion}
                    pagination={false}
                    expandable={{
                        expandedRowRender,
                        rowExpandable: (record: any) => record.answers && record.answers.length > 0,
                        expandedRowKeys: expandedRowKeys,
                        onExpand: onExpand,
                    }}
                    rowKey="idQuestion"
                />
            </div>
            {/* layout them - sua cua cau hoi */}
            <div>
                <Drawer
                    title={modeQuestion === 'add' ? `Thêm câu hỏi` : `Sửa câu hỏi`}
                    width={720}
                    onClose={onCloseQuestion}
                    open={openQuestion}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    formQuestion.resetFields();
                                    onCloseQuestion();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" onClick={handleSubmitQuestion}>
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form
                        form={formQuestion}
                        initialValues={{ course: 0, lessonID: null }}
                        layout="vertical"
                        hideRequiredMark
                    >
                        <Row gutter={16}>
                            <Col span={10}>
                                <Form.Item name="course" label="Khóa học">
                                    <Select
                                        className={cx('searchCourse')}
                                        placeholder="Vui lòng chọn khóa học ..."
                                        onChange={handleCourseChange_Q}
                                        options={[
                                            { value: 0, label: 'Tất cả' },
                                            ...listCourse_Q.map((item: any) => ({
                                                value: item.idCourse,
                                                label: item.nameCourse,
                                            })),
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="lessonID"
                                    label="Bài học"
                                    rules={[{ required: true, message: 'Please choose the lesson' }]}
                                >
                                    <Select
                                        className={cx('searchLesson')}
                                        placeholder="Vui lòng chọn bài học ..."
                                        options={[
                                            ...listLesson_Q.map((item: any) => ({
                                                value: item.idLesson,
                                                label: item.nameLesson,
                                            })),
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="title"
                                    label="Tiêu đề"
                                    rules={[{ required: true, message: 'Please enter' }]}
                                >
                                    <Input placeholder="Please enter" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="value"
                                    label="Nội dung câu hỏi"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter value',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={8} placeholder="please enter value" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
            {/* layout them - sua cua cau tra loi */}
            <div>
                <Drawer
                    title={modeAnsWer === 'add' ? `Thêm câu trả lời` : `Sửa câu trả lời`}
                    width={720}
                    onClose={onCloseAnsWer}
                    open={openAnsWer}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    formAnsWer.resetFields();
                                    onCloseAnsWer();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" onClick={handleSubmitAnsWer}>
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form form={formAnsWer} layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item
                                    name="value"
                                    label="Câu trả lời"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter value',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={8} placeholder="please enter value" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="correctAnswer"
                                    label="Đúng / Sai"
                                    rules={[{ required: true, message: 'Please enter choose' }]}
                                >
                                    <Select className={cx('searchCourse')} placeholder="Vui lòng chọn khóa học ...">
                                        <Option value={false}>Sai</Option>
                                        <Option value={true}>Đúng</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        </div>
    );
}

export default Questions;
