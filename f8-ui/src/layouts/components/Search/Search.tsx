/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { SearchIcon, ClearIcon, SearchResultIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ListSearch from '~/components/ListSearch';
import * as searchServices from '~/services/searchServices';
import * as userService from '~/services/userService';
import Router from '~/config';
import * as check from '~/untils/check';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cx = classNames.bind(styles);

const data: any = {
    // blog: [
    //     {
    //         id: 1,
    //         title: 'HTML CSS từ Zero đến Hero4',
    //         img: '',
    //     },
    //     {
    //         id: 1,
    //         title: 'HTML CSS từ Zero đến Hero5',
    //         img: '',
    //     },
    //     {
    //         id: 1,
    //         title: 'HTML CSS từ Zero đến Hero6',
    //         img: '',
    //     },
    // ],
    // video: [
    //     {
    //         id: 1,
    //         title: 'HTML CSS từ Zero đến Hero7',
    //         img: '',
    //     },
    //     {
    //         id: 1,
    //         title: 'HTML CSS từ Zero đến Hero8',
    //         img: '',
    //     },
    //     {
    //         id: 1,
    //         title: 'HTML CSS từ Zero đến Hero9',
    //         img: '',
    //     },
    // ],
};

function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(data);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(true);
    const debouncedValue = useDebounce(searchValue, 500);

    //Handle
    const handleChange = (e: any) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const [listRegisterCourse, setListRegisterCourse] = useState<any>([]);

    async function fetchRegisterCourse() {
        if (check.checkLogin()) {
            const result = await userService.getRegisterCourse();
            if (result.status === 200) setListRegisterCourse(result.data);
            if (result.status !== 200) setListRegisterCourse([]);
        } else {
            setListRegisterCourse([]);
        }
    }

    const handlecheckRegisterCourse = (idCourse: number) => {
        const isCheck = listRegisterCourse?.some((item: any) => item.courseID == idCourse);
        if (isCheck) {
            return Router.routes.learning + '?c=' + idCourse;
        } else {
            return Router.routes.courses + '?c=' + idCourse;
        }
    };

    useEffect(() => {
        fetchRegisterCourse();
    }, []);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.searchHome({
                params: {
                    value: debouncedValue,
                },
            });
            data.courses = result.data;
            setLoading(false);
            setSearchResult(data);
        };
        fetchApi();
    }, [debouncedValue]);
    return (
        <HeadlessTippy
            interactive
            placement="bottom-end"
            visible={showResult && searchValue.length > 0}
            render={(attrs) => (
                <ul className="Tippy-module_wrapper" tabIndex={-1} {...attrs}>
                    <div className={cx('search_result')}>
                        <div className={cx('search_header')}>
                            {!!searchValue && !loading && (
                                <SearchResultIcon width="14" height="14" className={cx('Search_icon')} />
                            )}
                            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                            <span>Kết quả cho {searchValue}</span>
                        </div>
                        <ListSearch data={searchResult} fuc={handlecheckRegisterCourse} />
                    </div>
                </ul>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <div className={cx('searchIcon')}>
                    <SearchIcon width="18" height="18" className="" />
                </div>
                <input
                    ref={inputRef}
                    className={cx('search_input')}
                    type="text"
                    placeholder="Tìm kiếm khóa học, bài viết, video, ..."
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => {
                        setShowResult(true);
                    }}
                />
                {!!searchValue && (
                    <div className={cx('clearIcon')} onClick={handleClear}>
                        <ClearIcon width="14" height="14" className="" />
                    </div>
                )}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
