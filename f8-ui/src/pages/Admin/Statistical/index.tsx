/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import styles from './Statistical.module.scss';
import { Col, Divider, Row, Table, Image } from 'antd';
import { ReadOutlined, UserAddOutlined, DollarOutlined, WalletOutlined, TrophyOutlined } from '@ant-design/icons';
import formatCurrencyVND from '~/untils/formatCurrencyVND';
import { useEffect, useState } from 'react';
// import moment from 'moment';

import * as dashboardService from '~/services/dashboardService';

const cx = classNames.bind(styles);
function Statistical() {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 4,
    });
    const [listCourseTable, setListCourseTable] = useState<any | null>([]);
    const [statistical, setStatistical] = useState<any | null>([]);

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const handleShowSizeChange = (current: any, size: number) => {
        setPagination({ ...pagination, pageSize: size });
    };

    async function fetchListCourseTable() {
        const rules = await dashboardService.getCoursesByRegistrations();
        setListCourseTable(rules.data);
    }

    async function fetchGetStatistical() {
        const rules = await dashboardService.getStatistical();
        setStatistical(rules.data);
        console.log(rules.data);
    }

    // Tables
    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 60,
            render: (_text: any, _record: any, index: number) => (
                <span style={{ fontWeight: 600 }}> {(pagination.current - 1) * pagination.pageSize + index + 1}</span>
            ),
        },
        { title: 'Tên khóa học', dataIndex: 'nameCourse', key: 'nameCourse' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (text: string) => <Image style={{ minHeight: 60 }} src={text} alt="course image" width={100} />,
        },
        {
            title: 'Thể loại',
            dataIndex: 'nameCategory',
            key: 'nameCategory',
            render: (text: any) => <div>{text || ''}</div>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (text: any) => {
                if (text === null || text == 0)
                    return <div style={{ textAlign: 'center', color: '#f05123' }}>Miễn phí</div>;
                return <div>{formatCurrencyVND(parseFloat(text))}</div>;
            },
        },
        {
            title: 'Phiếu giảm giá',
            dataIndex: 'discountValue',
            key: 'discountValue',
            align: 'center',
            render: (text: any) => (
                <div style={{ textAlign: 'center' }}>
                    <div>{!text && 'Không áp dụng'}</div>
                    <div style={{ color: 'red' }}>{text ? 'Giảm : ' + text + '%' : ''}</div>
                </div>
            ),
        },
        {
            title: 'Số lượt đăng ký',
            dataIndex: 'registrationCount',
            key: 'registrationCount',
            align: 'center',
        },
    ];

    useEffect(() => {
        fetchListCourseTable();
        fetchGetStatistical();
    }, []);
    return (
        <div className={cx('wapper')}>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <div className={cx('small-box', 'bg-info')}>
                        <div className={cx('inner')}>
                            <h3>{statistical.slCourse}</h3>
                            <p>Khóa học</p>
                        </div>
                        <div className={cx('icon')}>
                            <ReadOutlined />
                        </div>
                    </div>
                    <div className={cx('small-box-footer')}></div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div className={cx('small-box', 'bg-success')}>
                        <div className={cx('inner')}>
                            <h3>{statistical.slUser}</h3>
                            <p>Người đăng ký</p>
                        </div>
                        <div className={cx('icon')}>
                            <UserAddOutlined />
                        </div>
                    </div>
                    <div className={cx('small-box-footer')}></div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div className={cx('small-box', 'bg-warning')}>
                        <div className={cx('inner')}>
                            <h3>
                                <span style={{ fontSize: '1.8rem' }}>
                                    {formatCurrencyVND(parseFloat(statistical.total))}
                                </span>
                            </h3>
                            <p>Tổng doanh thu</p>
                        </div>
                        <div className={cx('icon')}>
                            <DollarOutlined />
                        </div>
                    </div>
                    <div className={cx('small-box-footer')}></div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div className={cx('small-box', 'bg-danger')}>
                        <div className={cx('inner')}>
                            <h3>{statistical.slCourseParticipation}</h3>
                            <p>Tổng khóa học đăng ký</p>
                        </div>
                        <div className={cx('icon')}>
                            <WalletOutlined />
                        </div>
                    </div>
                    <div className={cx('small-box-footer')}></div>
                </Col>
            </Row>
            <Divider orientation="left">Danh sách khóa học được đăng ký</Divider>
            <Row gutter={18}>
                <Col className="gutter-row" span={16}>
                    <div className={cx('table')} style={{ overflow: 'auto' }}>
                        <Table
                            dataSource={listCourseTable.map((item: any) => ({ ...item, key: item.idCourse }))}
                            columns={columns}
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                showSizeChanger: true,
                                pageSizeOptions: ['4', '10', '15', '20'],
                                showQuickJumper: true,
                                onShowSizeChange: handleShowSizeChange,
                            }}
                            scroll={{ y: 400 }} // Đặt chiều cao cố định cho bảng
                            onChange={handleTableChange}
                        />
                    </div>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Divider orientation="left" style={{ marginTop: 0 }}>
                        Top khóa học{' '}
                    </Divider>
                    <div>
                        {listCourseTable[0] ? (
                            <div className={cx('PostItem_wrapper')}>
                                <div className={cx('PostItem_body')}>
                                    <div className={cx('PostItem_info')}>
                                        <h2 className={cx('PostItem_name')}>
                                            {listCourseTable[0].nameCourse}
                                            <TrophyOutlined style={{ color: '#FFD700', marginLeft: '8px' }} />
                                        </h2>
                                        {listCourseTable[0].price != 0 ? (
                                            <div className={cx('price')}>
                                                <span className={cx('old-price')}>
                                                    {listCourseTable[0].discountValue &&
                                                        formatCurrencyVND(parseFloat(listCourseTable[0].price))}
                                                </span>
                                                <span className={cx('main-price')}>
                                                    {listCourseTable[0].discountValue
                                                        ? formatCurrencyVND(
                                                              listCourseTable[0].price -
                                                                  (listCourseTable[0].discountValue *
                                                                      listCourseTable[0].price) /
                                                                      100,
                                                          )
                                                        : formatCurrencyVND(parseFloat(listCourseTable[0].price))}
                                                </span>
                                            </div>
                                        ) : (
                                            <h5>Miễn phí</h5>
                                        )}
                                        <div className={cx('PostItem_category')}>
                                            <span>Thể loại:</span>
                                            <div className={cx('PostItem_tags')}>{listCourseTable[0].nameCategory}</div>
                                        </div>
                                    </div>
                                    <div className={cx('PostItem_thumb')}>
                                        <Image src={listCourseTable[0].image} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h3 className={cx('NoCourse')}>Không có khóa học nào đang hoạt động !!!</h3>
                        )}
                        {listCourseTable[1] && (
                            <div className={cx('PostItem_wrapper')}>
                                <div className={cx('PostItem_body')}>
                                    <div className={cx('PostItem_info')}>
                                        <h2 className={cx('PostItem_name')}>
                                            {listCourseTable[1].nameCourse}
                                            <TrophyOutlined style={{ color: '#C0C0C0', marginLeft: '8px' }} />
                                        </h2>
                                        {listCourseTable[1].price != 0 ? (
                                            <div className={cx('price')}>
                                                <span className={cx('old-price')}>
                                                    {listCourseTable[1].discountValue &&
                                                        formatCurrencyVND(parseFloat(listCourseTable[1].price))}
                                                </span>
                                                <span className={cx('main-price')}>
                                                    {listCourseTable[1].discountValue
                                                        ? formatCurrencyVND(
                                                              listCourseTable[1].price -
                                                                  (listCourseTable[1].discountValue *
                                                                      listCourseTable[1].price) /
                                                                      100,
                                                          )
                                                        : formatCurrencyVND(parseFloat(listCourseTable[1].price))}
                                                </span>
                                            </div>
                                        ) : (
                                            <h5>Miễn phí</h5>
                                        )}
                                        <div className={cx('PostItem_category')}>
                                            <span>Thể loại:</span>
                                            <div className={cx('PostItem_tags')}>{listCourseTable[1].nameCategory}</div>
                                        </div>
                                    </div>
                                    <div className={cx('PostItem_thumb')}>
                                        <Image src={listCourseTable[1].image} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {listCourseTable[2] && (
                            <div className={cx('PostItem_wrapper')}>
                                <div className={cx('PostItem_body')}>
                                    <div className={cx('PostItem_info')}>
                                        <h2 className={cx('PostItem_name')}>
                                            {listCourseTable[2].nameCourse}
                                            <TrophyOutlined style={{ color: '#CD7F32', marginLeft: '8px' }} />
                                        </h2>
                                        {listCourseTable[2].price != 0 ? (
                                            <div className={cx('price')}>
                                                <span className={cx('old-price')}>
                                                    {listCourseTable[2].discountValue &&
                                                        formatCurrencyVND(parseFloat(listCourseTable[2].price))}
                                                </span>
                                                <span className={cx('main-price')}>
                                                    {listCourseTable[2].discountValue
                                                        ? formatCurrencyVND(
                                                              listCourseTable[2].price -
                                                                  (listCourseTable[2].discountValue *
                                                                      listCourseTable[2].price) /
                                                                      100,
                                                          )
                                                        : formatCurrencyVND(parseFloat(listCourseTable[2].price))}
                                                </span>
                                            </div>
                                        ) : (
                                            <h5>Miễn phí</h5>
                                        )}
                                        <div className={cx('PostItem_category')}>
                                            <span>Thể loại:</span>
                                            <div className={cx('PostItem_tags')}>{listCourseTable[0].nameCategory}</div>
                                        </div>
                                    </div>
                                    <div className={cx('PostItem_thumb')}>
                                        <Image src={listCourseTable[2].image} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Statistical;
