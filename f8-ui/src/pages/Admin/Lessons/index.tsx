/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Lessons.module.scss';
import {
    Select,
    Table,
    Divider,
    Space,
    Button,
    Image,
    Tooltip,
    Drawer,
    Form,
    Row,
    Col,
    Input,
    Upload,
    message,
    Modal,
    Switch,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
// import StatusSwitch from '~/components/StatusSwitch';
import moment from 'moment';

import * as partCourseService from '~/services/partCourseService';
import * as courseSevice from '~/services/courseSevice';
import * as lessonService from '~/services/lessonService';

import Config from '~/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const cx = classNames.bind(styles);

function Lessons() {
    // PartCourse
    const [formPartCourse] = Form.useForm();
    const [openPartCourse, setOpenPartCourse] = useState(false);
    const [modePartCourse, setModePartCourse] = useState<'add' | 'edit'>('add');
    const [editingRecordPartCourse, setEditingRecordPartCourse] = useState<any>(null);

    const showDrawerPartCourse = (mode: 'add' | 'edit', record?: any) => {
        setModePartCourse(mode);
        if (mode === 'edit' && record) {
            setEditingRecordPartCourse(record);
            console.log(record);
            formPartCourse.setFieldsValue({ ...record, descriptionPartCourse: record.description });
        }
        setOpenPartCourse(true);
    };

    const onClosePartCourse = () => {
        setOpenPartCourse(false);
        formPartCourse.resetFields();
        setEditingRecordPartCourse(null);
    };

    const handleSubmitPartCourse = () => {
        formPartCourse
            .validateFields()
            .then((values) => {
                submitDataPartCourse(values);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const submitDataPartCourse = async (values: any) => {
        console.log('Submit data', values);

        let response;
        if (modePartCourse === 'add') {
            const data = {
                courseID: course.idCourse,
                namePartCourse: values.namePartCourse,
                description: values.descriptionPartCourse,
            };
            console.log('Submit data', data);

            response = await partCourseService.addPartCourse(data);
        } else {
            const data = {
                idPartCourse: editingRecordPartCourse.idPartCourse,
                namePartCourse: values.namePartCourse,
                description: values.descriptionPartCourse,
            };
            console.log('data update', data);
            response = await partCourseService.updatePartCourse(data);
        }

        if (response?.status === 200) {
            message.success(`${modePartCourse === 'add' ? 'Tạo' : 'Cập nhật'} mục lục thành công`);
            formPartCourse.resetFields();
            fetchListPartCourseTable(course.idCourse);
            onClosePartCourse();
        } else {
            message.error(`${modePartCourse === 'add' ? 'Tạo' : 'Cập nhật'} mục lục thất bại`);
        }
    };

    const handleDeletePartCourse = (record: any) => {
        console.log(record);
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa mục lục này không?',
            async onOk() {
                const deletePartCourse = await partCourseService.deletePartCourse(record.idPartCourse);
                if (deletePartCourse.status === 200) {
                    // fetchListPartCourseTable(course.idCourse);
                    message.success(`Xóa mục lục thành công`);
                } else {
                    message.error(`Xóa mục lục thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa mục lục đã bị hủy bỏ.');
            },
        });
    };

    const confirmSwitchChangePartCourse = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa mục lục này không? ',
            onOk: () => handleSwitchChangePartCourse(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChangePartCourse = async (id: any, newValue: any) => {
        const rules = await partCourseService.setStatus({
            idPartCourse: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa mục lục ${rules.data.messege.namePartCourse} thành công`);
            } else {
                message.warning(`Bạn đã khóa mục lục ${rules.data.messege.namePartCourse} thành công`);
            }
            fetchListPartCourseTable(course.idCourse);
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa mục lục ${rules.data.messege.namePartCourse} thất bại`);
            } else {
                message.error(`Bạn đã khóa mục lục ${rules.data.messege.namePartCourse} thất bại`);
            }
        }
    };

    ////////////////////
    // Lesson
    const [formLesson] = Form.useForm();
    const [partCourse, setPartCourse] = useState<any | null>(null);
    const [openLesson, setOpenLesson] = useState(false);
    const [modeLesson, setModeLesson] = useState<'add' | 'edit'>('add');
    const [editingRecordLesson, setEditingRecordLesson] = useState<any>(null);

    const normFileLesson = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const showDrawerLesson = (mode: 'add' | 'edit', record?: any) => {
        setPartCourse(record);
        setModeLesson(mode);
        if (mode === 'edit' && record) {
            console.log(record);
            setEditingRecordLesson(record);
            formLesson.setFieldsValue({
                ...record,
                descriptionLesson: record.description,
                image: record.image ? [{ uid: '-1', name: 'image.png', status: 'done', url: record.image }] : [],
            });
        }
        setOpenLesson(true);
    };

    const onCloseLesson = () => {
        setOpenLesson(false);
        formLesson.resetFields();
        setEditingRecordLesson(null);
    };

    const handleSubmitLesson = () => {
        formLesson
            .validateFields()
            .then((values) => {
                if (!values.image || !values.image[0]) {
                    // Hiển thị hộp thoại xác nhận nếu không có ảnh được tải lên
                    Modal.confirm({
                        title: 'Xác nhận submit',
                        content: 'Bạn chưa chọn hình ảnh. Bạn có chắc chắn muốn submit không?',
                        onOk() {
                            // Xử lý submit khi người dùng xác nhận
                            submitDataLesson(values);
                        },
                        onCancel() {
                            // Hủy bỏ hành động nếu người dùng không xác nhận
                            console.log('Submit đã bị hủy bỏ.');
                        },
                    });
                } else {
                    // Nếu có ảnh được chọn, thực hiện submit ngay lập tức
                    submitDataLesson(values);
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const submitDataLesson = async (values: any) => {
        let imageUrl: string = '';
        if (values.image && values.image[0]?.originFileObj) {
            const imageFile = values.image[0].originFileObj;
            const storageRef = ref(Config.storage, `/img/lessons/${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);
        }
        console.log('values', values);
        console.log('editingRecordLesson', editingRecordLesson);

        if (editingRecordLesson && values.image[0] && values.image[0].url === editingRecordLesson?.image) {
            imageUrl = editingRecordLesson?.image;
        }
        values = { ...values, image: imageUrl };

        let response;
        if (modeLesson === 'add') {
            console.log(values);
            const data = {
                nameLesson: values.nameLesson,
                description: values.descriptionLesson,
                videoID: values.videoID,
                partCourseID: partCourse.idPartCourse,
                image: values.image,
            };
            response = await lessonService.addLesson(data);
        } else {
            // console.log(values);
            const data = {
                idLesson: editingRecordLesson.idLesson,
                nameLesson: values.nameLesson,
                description: values.descriptionLesson,
                videoID: values.videoID,
                partCourseID: partCourse.idPartCourse,
                image: values.image,
            };
            response = await lessonService.updateLesson(data);
        }

        if (response?.status === 200) {
            message.success(`${modeLesson === 'add' ? 'Tạo' : 'Cập nhật'} khóa học thành công`);
            formLesson.resetFields();
            fetchListPartCourseTable(course.idCourse);
            onCloseLesson();
        } else {
            message.error(`${modeLesson === 'add' ? 'Tạo' : 'Cập nhật'} khóa học thất bại`);
        }
    };

    const handleDeleteLesson = (record: any) => {
        console.log(record);
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa bài học này không?',
            async onOk() {
                const deleteLesson = await lessonService.deleteLesson(record.idLesson);
                if (deleteLesson.status === 200) {
                    fetchListPartCourseTable(course.idCourse);
                    message.success(`Xóa bài học thành công`);
                } else {
                    message.error(`Xóa bài học thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa bài học đã bị hủy bỏ.');
            },
        });
    };

    const confirmSwitchChangeLesson = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa bài học này không? ',
            onOk: () => handleSwitchChangeLesson(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChangeLesson = async (id: any, newValue: any) => {
        const rules = await lessonService.setStatus({
            idLesson: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa bài học ${rules.data.messege.nameLesson} thành công`);
            } else {
                message.warning(`Bạn đã khóa bài học ${rules.data.messege.nameLesson} thành công`);
            }
            fetchListPartCourseTable(course.idCourse);
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa bài học ${rules.data.messege.nameLesson} thất bại`);
            } else {
                message.error(`Bạn đã khóa bài học ${rules.data.messege.nameLesson} thất bại`);
            }
        }
    };

    ////////////////
    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
    const [listCourse, setListCourse] = useState<any | null>([]);
    const [course, setCourse] = useState<any | null>(null);
    const [listPartCourseTable, setListPartCourseTable] = useState<any | null>([]);

    async function fetchListCourse() {
        const rules = await courseSevice.listCourseStatus1();
        setListCourse(rules.data);
    }
    async function fetchListPartCourseTable(courseID: any) {
        const courseData = await partCourseService.partCourseOfCourse(courseID);
        setListPartCourseTable(courseData.data);
    }

    const handleCourseChange = async (courseID: number, data: any) => {
        console.log(courseID);
        setCourse({ idCourse: courseID, nameCourse: data.children });
        // Gọi API để lấy thông tin khóa học dựa trên courseID
        fetchListPartCourseTable(courseID);
    };

    const columnsPartCourses = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_text: any, _record: any, index: number) => <span style={{ fontWeight: 600 }}>{index + 1}</span>,
        },
        { title: 'Tên phần học', dataIndex: 'namePartCourse', key: 'namePartCourse' },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (text: any) => <div className={cx('description')}>{text}</div>,
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
                            confirmSwitchChangePartCourse(record.idPartCourse, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChangePartCourse(record.idPartCourse, checked);
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
                    <Tooltip placement="top" title={<span>Thêm bài học cho mục này</span>}>
                        <Button type="default" onClick={() => showDrawerLesson('add', record)}>
                            Thêm
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title={<span>Sửa mục này</span>}>
                        <Button type="primary" onClick={() => showDrawerPartCourse('edit', record)}>
                            Sửa
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title={<span>Xóa mục này</span>}>
                        <Button danger onClick={() => handleDeletePartCourse(record)}>
                            Xóa
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const columnsLessons = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center' as const,
            render: (_text: any, _record: any, index: number) => index + 1,
        },
        { title: 'Tên bài học', dataIndex: 'nameLesson', key: 'nameLesson' },
        { title: 'ID video', dataIndex: 'videoID', key: 'videoID' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center' as const,
            render: (text: string) => <Image style={{ minHeight: 60 }} src={text} alt="course image" width={100} />,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 250,
            render: (text: any) => <div className={cx('description')}>{text}</div>,
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
                            confirmSwitchChangeLesson(record.idLesson, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChangeLesson(record.idLesson, checked);
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
                    <Button type="primary" onClick={() => showDrawerLesson('edit', record)}>
                        Sửa
                    </Button>
                    <Button danger onClick={() => handleDeleteLesson(record)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record: any) => {
        return (
            <Table
                dataSource={record.lessons}
                columns={columnsLessons}
                className={cx('tableLessons')}
                rowKey="idLesson"
                pagination={false}
            />
        );
    };

    const onExpand = (expanded: boolean, record: any) => {
        setExpandedRowKeys(expanded ? [record.idPartCourse] : []);
    };

    useEffect(() => {
        fetchListCourse();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {/* header */}
            <div>
                {course && (
                    <Button
                        className={cx('addPartCourse')}
                        onClick={() => showDrawerPartCourse('add')}
                        type="primary"
                        icon={<PlusOutlined />}
                    >
                        Thêm mục lục
                    </Button>
                )}
                <Select
                    className={cx('searchCourse')}
                    placeholder="Vui lòng chọn khóa học ..."
                    onChange={handleCourseChange}
                >
                    {listCourse.map((item: any, index: number) => (
                        <Option key={index} value={item.idCourse}>
                            {item.nameCourse}
                        </Option>
                    ))}
                </Select>
            </div>
            {/* tables */}
            <div>
                <Divider orientation="left">Mục lục {course ? `của khóa học ${course?.nameCourse}` : ''}</Divider>
                <Table
                    dataSource={listPartCourseTable}
                    columns={columnsPartCourses}
                    pagination={false}
                    expandable={{
                        expandedRowRender,
                        rowExpandable: (record: any) => record.lessons && record.lessons.length > 0,
                        expandedRowKeys: expandedRowKeys,
                        onExpand: onExpand,
                    }}
                    rowKey="idPartCourse"
                />
            </div>
            {/* layout them - sua cua muc luc */}
            <div>
                <Drawer
                    title={
                        modePartCourse === 'add'
                            ? `Thêm mục lục của khóa học ${course?.nameCourse}`
                            : `Sửa mục lục của khóa học ${course?.nameCourse}`
                    }
                    width={720}
                    onClose={onClosePartCourse}
                    open={openPartCourse}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    formPartCourse.resetFields();
                                    onClosePartCourse();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" onClick={handleSubmitPartCourse}>
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form form={formPartCourse} layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="namePartCourse"
                                    label="Tên mục lục"
                                    rules={[{ required: true, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="descriptionPartCourse"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={8} placeholder="please enter description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
            {/* layout them - sua cua bai hoc */}
            <div>
                <Drawer
                    title={modeLesson === 'add' ? 'Thêm bài học' : 'Sửa bài học'}
                    width={720}
                    onClose={onCloseLesson}
                    open={openLesson}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    formLesson.resetFields();
                                    onCloseLesson();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" onClick={handleSubmitLesson}>
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form form={formLesson} layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="nameLesson"
                                    label="Tên bài học"
                                    rules={[{ required: true, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="videoID"
                                    label="Video bài học"
                                    rules={[{ required: true, message: 'Please enter video deno' }]}
                                >
                                    <Input placeholder="Please enter video deno" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="image"
                                    label="Upload"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFileLesson}
                                >
                                    <Upload
                                        listType="picture-card"
                                        maxCount={1}
                                        beforeUpload={() => false}
                                        accept=".jpg,.jpeg,.png"
                                        defaultFileList={
                                            modeLesson === 'edit' && editingRecordLesson?.image
                                                ? [
                                                      {
                                                          uid: '-1',
                                                          name: 'image.png',
                                                          status: 'done',
                                                          url: editingRecordLesson.image,
                                                      },
                                                  ]
                                                : []
                                        }
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="descriptionLesson"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={8} placeholder="please enter description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        </div>
    );
}

export default Lessons;
