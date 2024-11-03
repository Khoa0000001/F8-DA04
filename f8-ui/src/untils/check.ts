import Cookies from 'js-cookie';

export const checkLogin = () => {
    const authentication = Cookies.get('login');
    if (authentication === '1') {
        return true;
    } else {
        return false;
    }
};
