/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from './Header';
import SearchItem from './SearchItem';

function ListSearch({ data, fuc }: { data: any; fuc: any }) {
    return (
        <>
            {data.courses && data.courses.length > 0 && <Header title="KHOA HỌC" href="" />}
            {data.courses &&
                data.courses.map((item: any, index: number) => (
                    <SearchItem key={index} title={item.nameCourse} src={item.image || ''} href={fuc(item.idCourse)} />
                ))}
            {data.blog && data.blog.length > 0 && <Header title="BÀI VIẾT" href="" />}
            {data.blog &&
                data.blog.map((item: any, index: number) => (
                    <SearchItem key={index} title={item.title} src={item.img} href="" />
                ))}
            {data.blog && data.video.length > 0 && <Header title="VIDEO" href="" />}
            {data.blog &&
                data.video.map((item: any, index: number) => (
                    <SearchItem key={index} title={item.title} src={item.img} href="" />
                ))}
        </>
    );
}

export default ListSearch;
