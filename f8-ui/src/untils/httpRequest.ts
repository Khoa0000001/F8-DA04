/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    withCredentials: true, // Đảm bảo gửi cookie kèm theo yêu cầu
});

// httpRequest.defaults.withCredentials = true;

export const GET = async ({ path, options }: { path: string; options?: any }) => {
    const response = await httpRequest.get(path, options);
    return response;
};
export const POST = async ({ path, options }: { path: string; options?: any }) => {
    const response = await httpRequest.post(path, options);
    return response;
};
export const PUT = async ({ path, options }: { path: string; options?: any }) => {
    const response = await httpRequest.put(path, options);
    return response;
};

export const REMOVE = async ({ path, options }: { path: string; options?: any }) => {
    const response = await httpRequest.delete(path, options);
    return response;
};

export default httpRequest;
