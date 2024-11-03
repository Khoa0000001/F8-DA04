/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpRequest from '~/untils/httpRequest';

export const listDiscountStatus1 = async () => {
    try {
        const res = await httpRequest.GET({ path: `/discount/listStatus` });
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

export const addDiscount = async (options: any) => {
    try {
        const res = await httpRequest.POST({ path: `/discount/add`, options });
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

export const updateDiscount = async (options: any) => {
    try {
        const res = await httpRequest.PUT({ path: `/discount/update`, options });
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
        const res = await httpRequest.PUT({ path: `/discount/setStatus`, options });
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

export const deleteDiscount = async (options: any) => {
    try {
        const res = await httpRequest.REMOVE({ path: `/discount/delete/${options}` });
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

export const listDiscountOfTable = async () => {
    try {
        const res = await httpRequest.GET({ path: `/discount/listDiscountOfTable` });
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
