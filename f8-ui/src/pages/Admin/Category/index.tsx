/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Modal,
    Row,
    Space,
    Table,
    Upload,
    Image,
    message,
    Divider,
    Switch,
} from 'antd';
// import StatusSwitch from '~/components/StatusSwitch';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';

import * as categorySevice from '~/services/categorySevice';

import Config from '~/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';

const cx = classNames.bind(styles);

function Category() {
    const [form] = Form.useForm(); // Use Form instance
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
    });
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [listCategoryTable, setListCategoryTable] = useState<any | null>([]);

    const showDrawer = (mode: 'add' | 'edit', record?: any) => {
        setMode(mode);
        if (mode === 'edit' && record) {
            setEditingRecord(record);
            form.setFieldsValue({
                ...record,
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

    async function fetchListCategoryTable() {
        const rules = await categorySevice.listCatygory();
        setListCategoryTable(rules.data);
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

        if (values.image && values.image[0]?.originFileObj) {
            const imageFile = values.image[0].originFileObj;
            const storageRef = ref(Config.storage, `/img/category/${imageFile.name}`);
            const snapshot = await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(snapshot.ref);
        }
        if (editingRecord && values.image[0] && values.image[0].url === editingRecord?.image) {
            imageUrl = editingRecord?.image;
        }
        values = { ...values, image: imageUrl };

        let response;
        if (mode === 'add') {
            response = await categorySevice.addCatygory(values);
        } else {
            response = await categorySevice.updateCatygory({ idCategory: editingRecord.idCategory, ...values });
        }

        if (response.status === 200) {
            message.success(`${mode === 'add' ? 'Tạo' : 'Cập nhật'} thể loại thành công`);
            form.resetFields();
            fetchListCategoryTable();
            onClose();
        } else {
            message.error(`${mode === 'add' ? 'Tạo' : 'Cập nhật'} thể loại thất bại`);
        }
    };

    const handleDelete = async (record: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa thể loại này không?',
            async onOk() {
                const deleteCategory = await categorySevice.deleteCatygory(record.idCategory);
                if (deleteCategory.status === 200) {
                    fetchListCategoryTable();
                    message.success(`Xóa thể loại thành công`);
                } else {
                    message.error(`Xóa thể loại thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa thể loại đã bị hủy bỏ.');
            },
        });
    };

    const confirmSwitchChange = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa loại khóa học này không? ',
            onOk: () => handleSwitchChange(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChange = async (id: any, newValue: any) => {
        const rules = await categorySevice.setStatus({
            idCategory: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa thể loại ${rules.data.messege.nameCategory} thành công`);
            } else {
                message.warning(`Bạn đã khóa thể loại ${rules.data.messege.nameCategory} thành công`);
            }
            fetchListCategoryTable();
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa thể loại ${rules.data.messege.nameCategory} thất bại`);
            } else {
                message.error(`Bạn đã khóa thể loại ${rules.data.messege.nameCategory} thất bại`);
            }
        }
    };
    //

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleShowSizeChange = (current: any, size: number) => {
        setPagination({ ...pagination, pageSize: size });
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
        { title: 'Tên thể loại', dataIndex: 'nameCategory', key: 'nameCategory' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (text: string) => <Image style={{ minHeight: 60 }} src={text} alt="course image" width={100} />,
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
                            confirmSwitchChange(record.idCategory, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChange(record.idCategory, checked);
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

    useEffect(() => {
        fetchListCategoryTable();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Button type="primary" onClick={() => showDrawer('add')} icon={<PlusOutlined />}>
                Thêm thể loại
            </Button>
            <Divider orientation="left">Danh sách thể loại khóa học</Divider>
            <Table
                dataSource={listCategoryTable.map((item: any) => ({ ...item, key: item.idCategory }))}
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
                title={mode === 'add' ? 'Thêm thể loại' : 'Sửa thể loại'}
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
                        <Col span={24}>
                            <Form.Item
                                name="nameCategory"
                                label="Tên thể loại"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
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

export default Category;
