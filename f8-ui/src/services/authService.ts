/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpRequest from '~/untils/httpRequest';
import { toast } from 'react-toastify';

export const auth = async () => {
    try {
        const res = await httpRequest.GET({ path: `/auth` });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            const message = error.response.data.messege + '!';
            toast.error(message);
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const authentication = async () => {
    try {
        const res = await httpRequest.GET({ path: `/auth/authentication` });
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

export const login = async (options: any) => {
    try {
        const res = await httpRequest.POST({ path: `/auth/login`, options });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            const message = error.response.data.messege + '!';
            toast.error(message);
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};

export const register = async (options: any) => {
    try {
        const res = await httpRequest.POST({ path: `/auth/register`, options });
        return res;
    } catch (error: any) {
        if (error.response) {
            // Server trả về mã trạng thái ngoài 2xx
            const message = error.response.data.messege + '!';
            toast.error(message);
            return error.response;
        } else {
            // Lỗi không phải từ server (ví dụ: lỗi mạng)
            console.error('Error logging in:', error);
            throw new Error('Network error');
        }
    }
};
