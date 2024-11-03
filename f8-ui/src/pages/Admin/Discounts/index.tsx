/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './Discounts.module.scss';
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Drawer,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Space,
    Switch,
    Table,
    message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as discountService from '~/services/discountService';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

function Discounts() {
    const [form] = Form.useForm(); // Use Form instance

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [listDiscountTable, setListDiscountTable] = useState<any | null>([]);

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleShowSizeChange = (current: any, size: number) => {
        setPagination({ ...pagination, pageSize: size });
    };

    async function fetchListDiscountTable() {
        const rules = await discountService.listDiscountOfTable();
        setListDiscountTable(rules.data);
    }

    const handleBlur = (value: any) => {
        // Áp dụng định dạng cho giá trị đã nhập
        const formattedValue = parseFloat(value).toFixed(2);
        console.log('Giá trị sau khi định dạng:', formattedValue);
        // Thực hiện các hành động khác tại đây (nếu cần)
    };
    const showDrawer = (mode: 'add' | 'edit', record?: any) => {
        setMode(mode);
        if (mode === 'edit' && record) {
            console.log(record);
            setEditingRecord(record);
            form.setFieldsValue({
                ...record,
                expiredAt: record.expiredAt && dayjs(record.expiredAt),
                value: Number(record.value),
            });
        }
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields();
        setEditingRecord(null);
    };

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                if (!values.expiredAt) {
                    Modal.confirm({
                        title: 'Xác nhận submit',
                        content:
                            'Nếu bạn để ngày hết hạn trống thì phiếu giảm giá này sẽ có thời hạn vĩnh viễn. Bạn có chắc chắn muốn submit không?',
                        onOk() {
                            submitData(values);
                        },
                        onCancel() {
                            // Hủy bỏ hành động nếu người dùng không xác nhận
                            console.log('Submit đã bị hủy bỏ.');
                        },
                    });
                } else {
                    submitData(values);
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };
    const submitData = async (values: any) => {
        let response;
        if (mode === 'add') {
            console.log('Submit add', values);
            response = await discountService.addDiscount(values);
        } else {
            console.log('Submit update', values);
            response = await discountService.updateDiscount({ ...values, idDiscount: editingRecord.idDiscount });
        }

        if (response.status === 200) {
            message.success(`${mode === 'add' ? 'Tạo' : 'Cập nhật'} phiếu giảm giá thành công`);
            form.resetFields();
            fetchListDiscountTable();
            onClose();
        } else {
            message.error(`${mode === 'add' ? 'Tạo' : 'Cập nhật'} phiếu giảm giá thất bại`);
        }
    };

    const confirmSwitchChange = (idDiscount: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content:
                'Nếu khóa tất cả khóa học có phiểu giảm giá này sẽ không còn giảm giá nữa!!! Bạn có chắc muốn khóa phiếu giảm giá này không? ',
            onOk: () => handleSwitchChange(idDiscount, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChange = async (id: any, newValue: any) => {
        const rules = await discountService.setStatus({
            idDiscount: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa phiếu giảm giá ${rules.data.messege.title} thành công`);
            } else {
                message.warning(`Bạn đã khóa phiếu giảm giá ${rules.data.messege.title} thành công`);
            }
            fetchListDiscountTable();
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa phiếu giảm giá ${rules.data.messege.title} thất bại`);
            } else {
                message.error(`Bạn đã khóa phiếu giảm giá ${rules.data.messege.title} thất bại`);
            }
        }
    };

    const handleDelete = async (record: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa phiếu giảm giá này không?',
            async onOk() {
                const deleteDiscount = await discountService.deleteDiscount(record.idDiscount);
                if (deleteDiscount.status === 200) {
                    fetchListDiscountTable();
                    message.success(`Xóa phiếu giảm giá thành công`);
                } else {
                    message.error(`Xóa phiếu giảm giá thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa phiếu giảm giá đã bị hủy bỏ.');
            },
        });
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
        { title: 'Tên giảm giá', dataIndex: 'title', key: 'title' },
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
                            confirmSwitchChange(record.idDiscount, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChange(record.idDiscount, checked);
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
            title: 'Giá trị giảm giá',
            dataIndex: 'value',
            key: 'value',
            align: 'center',
            render: (text: any) => (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'red' }}>{text ? text + '%' : ''}</div>
                </div>
            ),
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expiredAt',
            key: 'expiredAt',
            align: 'center',
            render: (text: any) =>
                text ? moment(text).format('DD-MM-YYYY') : <div style={{ color: 'blue' }}>Vĩnh viễn</div>,
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
        fetchListDiscountTable();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Button type="primary" onClick={() => showDrawer('add')} icon={<PlusOutlined />}>
                Thêm phiếu giảm giá
            </Button>
            <Divider orientation="left">Danh sách phiếu giảm giá</Divider>
            <Table
                dataSource={listDiscountTable.map((item: any) => ({ ...item, key: item.idDiscount }))}
                columns={columns}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '15', '20'],
                    showQuickJumper: true,
                    onShowSizeChange: handleShowSizeChange,
                }}
                onChange={handleTableChange}
            />
            <Drawer
                title={mode === 'add' ? 'Thêm phiếu giảm giá' : 'Sửa phiếu giảm giá'}
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
                <Form form={form} layout="vertical" initialValues={{ value: 0.0 }} hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={14}>
                            <Form.Item
                                name="title"
                                label="Tên phiếu giảm giá"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name="value"
                                label="Phần trăm giảm giá(%)"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá trị!' },
                                    { type: 'number', message: 'Giá trị phải là số!' },
                                    {
                                        validator: (_, value) => {
                                            if (value !== 0) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Giá trị phải khác 0!'));
                                        },
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    max={100}
                                    step={0.01}
                                    style={{ width: '150px' }}
                                    onBlur={(e) => handleBlur(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="expiredAt"
                                label="Ngày hết hạn"
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            const currentDate = moment().startOf('day'); // Lấy ngày hiện tại

                                            if (!value || value.startOf('day').isAfter(currentDate)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Ngày hết hạn phải lớn hơn ngày hiện tại');
                                        },
                                    }),
                                ]}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD" // Định dạng ngày tháng năm
                                    // defaultValue={defaultExpiredAt} // Sử dụng giá trị đã chuyển đổi
                                    placeholder="Vui lòng chọn ngày hết hạn"
                                />
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

export default Discounts;
