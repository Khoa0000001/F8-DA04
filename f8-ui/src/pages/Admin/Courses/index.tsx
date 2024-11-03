/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import formatCurrencyVND from '~/untils/formatCurrencyVND';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';
import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Space,
    Upload,
    Modal,
    message,
    Table,
    // Switch,
    Image,
    Divider,
    Switch,
} from 'antd';
// import StatusSwitch from '~/components/StatusSwitch';
import { PlusOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';

import * as categorySevice from '~/services/categorySevice';
import * as courseSevice from '~/services/courseSevice';
import * as discountService from '~/services/discountService';

import Config from '~/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const { Option } = Select;

const cx = classNames.bind(styles);

function Courses() {
    const [form] = Form.useForm(); // Use Form instance
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
    });
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [listCategory, setListCategory] = useState<any | null>([]);
    const [listDiscount, setListDiscount] = useState<any | null>([]);
    const [listCourseTable, setListCourseTable] = useState<any | null>([]);

    const showDrawer = (mode: 'add' | 'edit', record?: any) => {
        setMode(mode);
        if (mode === 'edit' && record) {
            setEditingRecord(record);
            form.setFieldsValue({
                ...record,
                price: parseFloat(record.price),
                image: record.image ? [{ uid: '-1', name: 'image.png', status: 'done', url: record.image }] : [],
            });
        }
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields();
        setEditingRecord(null);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    async function fetchListCourseTable() {
        const rules = await courseSevice.listCourseOfTable();
        setListCourseTable(rules.data);
    }

    async function fetchListCategory() {
        const rules = await categorySevice.listCatygoryStatus1();
        setListCategory(rules.data);
    }

    async function fetchListDiscount() {
        const rules = await discountService.listDiscountStatus1();
        setListDiscount(rules.data);
    }

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                if (!values.image || !values.image[0]) {
                    // Hiển thị hộp thoại xác nhận nếu không có ảnh được tải lên
                    Modal.confirm({
                        title: 'Xác nhận submit',
                        content: 'Bạn chưa chọn hình ảnh. Bạn có chắc chắn muốn submit không?',
                        onOk() {
                            // Xử lý submit khi người dùng xác nhận
                            submitData(values);
                        },
                        onCancel() {
                            // Hủy bỏ hành động nếu người dùng không xác nhận
                            console.log('Submit đã bị hủy bỏ.');
                        },
                    });
                } else {
                    // Nếu có ảnh được chọn, thực hiện submit ngay lập tức
                    submitData(values);
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const submitData = async (values: any) => {
        let imageUrl: string = '';
        console.log('values', values);
        console.log('editingRecord', editingRecord);

        if (values.image && values.image[0]?.originFileObj) {
            const imageFile = values.image[0].originFileObj;
            const storageRef = ref(Config.storage, `/img/coures/${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);
        }
        if (editingRecord && values.image[0] && values.image[0].url === editingRecord?.image) {
            imageUrl = editingRecord?.image;
        }
        values = { ...values, image: imageUrl };

        let response;
        if (mode === 'add') {
            response = await courseSevice.addCourse(values);
        } else {
            console.log('data update', { idCourse: editingRecord.idCourse, ...values });
            response = await courseSevice.updateCourse({ idCourse: editingRecord.idCourse, ...values });
        }

        if (response.status === 200) {
            message.success(`${mode === 'add' ? 'Tạo' : 'Cập nhật'} khóa học thành công`);
            form.resetFields();
            fetchListCourseTable();
            onClose();
        } else {
            message.error(`${mode === 'add' ? 'Tạo' : 'Cập nhật'} khóa học thất bại`);
        }
    };
    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleShowSizeChange = (current: any, size: number) => {
        setPagination({ ...pagination, pageSize: size });
    };
    const handleDelete = async (record: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa khóa học này không?',
            async onOk() {
                const deleteCourse = await courseSevice.deleteCourse(record.idCourse);
                if (deleteCourse.status === 200) {
                    fetchListCourseTable();
                    message.success(`Xóa khóa học thành công`);
                } else {
                    message.error(`Xóa khóa học thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa khóa học đã bị hủy bỏ.');
            },
        });
    };

    const confirmSwitchChange = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa khóa học này không? ',
            onOk: () => handleSwitchChange(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChange = async (id: any, newValue: any) => {
        const rules = await courseSevice.setStatus({
            idCourse: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa khóa học ${rules.data.messege.nameCourse} thành công`);
            } else {
                message.warning(`Bạn đã khóa khóa học ${rules.data.messege.nameCourse} thành công`);
            }
            fetchListCourseTable();
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa khóa học ${rules.data.messege.nameCourse} thất bại`);
            } else {
                message.error(`Bạn đã khóa khóa học ${rules.data.messege.nameCourse} thất bại`);
            }
        }
    };

    // validate
    const validateDiscountID = (_: any, value: any) => {
        const price = form.getFieldValue('price');
        if (price === 0 && value !== null) {
            return Promise.reject(new Error('Không thể áp dụng phiếu giảm giá khi giá bằng 0'));
        }
        return Promise.resolve();
    };

    // Tables
    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_text: any, _record: any, index: number) => (
                <span style={{ fontWeight: 600 }}> {(pagination.current - 1) * pagination.pageSize + index + 1}</span>
            ),
        },
        { title: 'Tên khóa học', dataIndex: 'nameCourse', key: 'nameCourse' },
        { title: 'Video Demo', dataIndex: 'videoDemo', key: 'videoDemo' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (text: string) => <Image style={{ minHeight: 60 }} src={text} alt="course image" width={100} />,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (text: any) => {
                if (text === null) text = 0;
                return <div>{formatCurrencyVND(parseFloat(text))}</div>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text: any, record: any) => (
                <Switch
                    checked={text === 1}
                    onChange={(checked) => {
                        if (text === 1 && !checked) {
                            // Nếu trạng thái thay đổi từ 1 về 0, hiển thị confirm
                            confirmSwitchChange(record.idCourse, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChange(record.idCourse, checked);
                        }
                    }}
                />
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (text: any) => <div className={cx('description')}>{text}</div>,
        },
        {
            title: 'Thể loại',
            dataIndex: 'categories',
            key: 'categories',
            render: (text: any) => <div>{text?.nameCategory || ''}</div>,
        },
        {
            title: 'Phiếu giảm giá',
            dataIndex: 'discounts',
            key: 'discounts',
            render: (text: any) => (
                <div style={{ textAlign: 'center' }}>
                    <div>{text?.title || 'Không áp dụng'}</div>
                    <div style={{ color: 'red' }}>{text ? 'Giảm : ' + text?.value + '%' : ''}</div>
                </div>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center',
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'center',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawer('edit', record)}>
                        Sửa
                    </Button>
                    <Button danger onClick={() => handleDelete(record)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    //

    useEffect(() => {
        fetchListCategory();
        fetchListDiscount();
        fetchListCourseTable();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Button type="primary" onClick={() => showDrawer('add')} icon={<PlusOutlined />}>
                Thêm khóa học
            </Button>
            <Divider orientation="left">Danh sách khóa học</Divider>
            <Table
                dataSource={listCourseTable.map((item: any) => ({ ...item, key: item.idCourse }))}
                columns={columns}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['3', '10', '15', '20'],
                    showQuickJumper: true,
                    onShowSizeChange: handleShowSizeChange,
                }}
                onChange={handleTableChange}
            />
            <Drawer
                title={mode === 'add' ? 'Thêm khóa học' : 'Sửa khóa học'}
                width={720}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" initialValues={{ price: 0, discountID: null }} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nameCourse"
                                label="Tên khóa học"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="videoDemo"
                                label="Video Demo"
                                rules={[{ required: true, message: 'Please enter video deno' }]}
                            >
                                <Input placeholder="Please enter video deno" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categoryID"
                                label="Loại khóa học"
                                rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                                <Select placeholder="Please choose the type">
                                    {listCategory.map((item: any, index: number) => (
                                        <Option key={index} value={item.idCategory}>
                                            {item.nameCategory}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="discountID"
                                label="Phiếu giảm giá"
                                rules={[{ validator: validateDiscountID }]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value={null}>Không áp dụng</Option>
                                    {listDiscount.map((item: any, index: number) => (
                                        <Option key={index} value={item.idDiscount}>
                                            {item.title}=="{item.value}%"
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="image"
                                label="Upload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    listType="picture-card"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    accept=".jpg,.jpeg,.png"
                                    defaultFileList={
                                        mode === 'edit' && editingRecord?.image
                                            ? [
                                                  {
                                                      uid: '-1',
                                                      name: 'image.png',
                                                      status: 'done',
                                                      url: editingRecord.image,
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
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá khóa học"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: 'The price must be a number and greater than or equal to 0',
                                    },
                                ]}
                            >
                                <InputNumber min={0} style={{ width: '150px' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
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
    );
}

export default Courses;
