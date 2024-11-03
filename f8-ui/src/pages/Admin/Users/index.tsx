/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, Modal, Space, Switch, Table, message, Image } from 'antd';

import * as userService from '~/services/userService';

function Users() {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });
    const [listUserTable, setListUserTable] = useState<any | null>([]);

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleShowSizeChange = (current: any, size: number) => {
        setPagination({ ...pagination, pageSize: size });
    };

    async function fetchListUserTable() {
        const rules = await userService.listUserOfTable();
        setListUserTable(rules.data);
    }
    const confirmSwitchChange = (id: any, newValue: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn khóa người dùng này không? ',
            onOk: () => handleSwitchChange(id, newValue),
            onCancel() {
                console.log('Hủy thay đổi');
            },
        });
    };

    const handleSwitchChange = async (id: any, newValue: any) => {
        const rules = await userService.setStatus({
            idUser: id,
            value: newValue,
        });

        if (rules.status === 200) {
            if (newValue) {
                message.success(`Bạn đã mở khóa người dùng ${rules.data.messege.name} thành công`);
            } else {
                message.warning(`Bạn đã khóa người dùng ${rules.data.messege.name} thành công`);
            }
            fetchListUserTable();
        } else {
            if (newValue) {
                message.error(`Bạn đã mở khóa người dùng ${rules.data.messege.name} thất bại`);
            } else {
                message.error(`Bạn đã khóa người dùng ${rules.data.messege.name} thất bại`);
            }
        }
    };
    const handleDelete = async (record: any) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có muốn xóa người dùng này không?',
            async onOk() {
                const deleteUser = await userService.deleteUser(record.idUser);
                if (deleteUser.status === 200) {
                    fetchListUserTable();
                    message.success(`Xóa người dùng thành công`);
                } else {
                    message.error(`Xóa người dùng thất bại`);
                }
            },
            onCancel() {
                console.log('Xóa người dùng đã bị hủy bỏ.');
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
        { title: 'Tên người dùng', dataIndex: 'name', key: 'name' },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
            width: 60,
            render: (text: string) => (
                <Image
                    style={{ minHeight: 60, width: 60, borderRadius: '50%' }}
                    src={text}
                    alt="user image"
                    width={100}
                />
            ),
        },
        { title: 'SĐT', dataIndex: 'numberPhone', key: 'numberPhone' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Quyền',
            dataIndex: 'groups',
            key: 'groups',
            render: (text: any) => <span style={{ fontWeight: 600 }}>{text.nameGroup}</span>,
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
                            confirmSwitchChange(record.idUser, checked);
                        } else {
                            // Ngược lại, thay đổi trạng thái trực tiếp
                            handleSwitchChange(record.idUser, checked);
                        }
                    }}
                />
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
                    <Button danger onClick={() => handleDelete(record)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        fetchListUserTable();
    }, []);
    return (
        <div>
            <Table
                dataSource={listUserTable.map((item: any) => ({ ...item, key: item.idUser }))}
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
        </div>
    );
}

export default Users;
