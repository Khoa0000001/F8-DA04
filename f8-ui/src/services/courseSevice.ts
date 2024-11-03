/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpRequest from '~/untils/httpRequest';
import { REMOVE } from '~/untils/httpRequest';

export const InfoCourse = async (options: any) => {
    try {
        const res = await httpRequest.GET({ path: `/course/info/${options}` });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const registerCourse = async (options: any) => {
    try {
        const res = await httpRequest.POST({ path: `/CourseParticipation/registerCourse/${options}` });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const addCourse = async (options: any) => {
    try {
        const res = await httpRequest.POST({ path: `/course/add`, options });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const updateCourse = async (options: any) => {
    try {
        const res = await httpRequest.PUT({ path: `/course/update`, options });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const setStatus = async (options: any) => {
    try {
        const res = await httpRequest.PUT({ path: `/course/setStatus`, options });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const deleteCourse = async (options: any) => {
    try {
        const res = await REMOVE({ path: `/course/delete/${options}` });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const listCourseOfTable = async () => {
    try {
        const res = await httpRequest.GET({ path: `/course/listCourseOfTable` });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const listCourseStatus1 = async () => {
    try {
        const res = await httpRequest.GET({ path: `/course/listCourseStatus1` });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};


