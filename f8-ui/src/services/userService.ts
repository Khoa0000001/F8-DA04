/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpRequest from '~/untils/httpRequest';

export const infoUser = async () => {
    try {
        const res = await httpRequest.GET({ path: `/user/infoUser` });
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

export const checkPhoneExists = async (options: any) => {
    try {
        const res = await httpRequest.GET({ path: `/user/checkPhoneNumber`, options });
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

export const getRegisterCourse = async () => {
    try {
        const res = await httpRequest.GET({ path: `/CourseParticipation/getRegisterCourse` });
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
        const res = await httpRequest.PUT({ path: `/user/setStatus`, options });
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

export const deleteUser = async (options: any) => {
    try {
        const res = await httpRequest.REMOVE({ path: `/user/delete/${options}` });
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

export const listUserOfTable = async () => {
    try {
        const res = await httpRequest.GET({ path: `/user/listUserOfTable` });
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
