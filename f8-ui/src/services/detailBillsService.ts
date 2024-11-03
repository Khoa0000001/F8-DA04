/* eslint-disable @typescript-eslint/no-explicit-any */
import * as httpRequest from '~/untils/httpRequest';

export const listBillsOfTable = async () => {
    try {
        const res = await httpRequest.GET({ path: `/detailBills/listBillsOfTable` });
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
