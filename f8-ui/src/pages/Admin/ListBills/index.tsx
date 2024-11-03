/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Divider, Table } from 'antd';
import classNames from 'classnames/bind';
import styles from './ListBills.module.scss';

import * as detailBillsService from '~/services/detailBillsService';
import formatCurrencyVND from '~/untils/formatCurrencyVND';

const cx = classNames.bind(styles);

function ListBills() {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [listBillsTable, setListBillsTable] = useState<any | null>([]);

    async function fetchListBillsTable() {
        const rules = await detailBillsService.listBillsOfTable();
        setListBillsTable(rules.data);
        console.log(rules.data);
    }

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
        { title: 'Tên khóa học', dataIndex: 'nameCourse', key: 'nameCourse' },
        { title: 'Thể loại', dataIndex: 'nameCategory', key: 'nameCategory', align: 'center' },
        { title: 'Tên người đăng ký', dataIndex: 'nameUser', key: 'nameUser', align: 'center' },
        { title: 'Sđt người đăng ký', dataIndex: 'numberPhone', key: 'numberPhone', align: 'center' },
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
            title: 'Phiếu giảm giá',
            dataIndex: 'discountValue',
            key: 'discountValue',
            align: 'center',
            render: (text: any) => (
                <div>
                    <div>{!text && 'Không áp dụng'}</div>
                    <div style={{ color: 'red' }}>{text ? 'Giảm : ' + text + '%' : ''}</div>
                </div>
            ),
        },
        {
            title: 'Thành giá',
            dataIndex: 'priceResults',
            key: 'priceResults',
            align: 'right',
            render: (text: any) => {
                if (text === null) text = 0;
                return <div>{formatCurrencyVND(parseFloat(text))}</div>;
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (text: any) => moment(text).format('DD-MM-YYYY'),
        },
        // {
        //     title: 'Ngày sửa',
        //     dataIndex: 'updatedAt',
        //     key: 'updatedAt',
        //     align: 'center',
        //     render: (text: any) => moment(text).format('DD-MM-YYYY'),
        // },
    ];

    useEffect(() => {
        fetchListBillsTable();
    }, []);
    return (
        <div className={cx('wapper')}>
            <Divider orientation="left">Danh sách hóa đơn</Divider>
            <Table
                dataSource={listBillsTable.map((item: any) => ({ ...item, key: item.idDetailBill }))}
                columns={columns}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '40'],
                    showQuickJumper: true,
                    onShowSizeChange: handleShowSizeChange,
                }}
                onChange={handleTableChange}
            />
        </div>
    );
}

export default ListBills;
