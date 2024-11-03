import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactNode, useEffect, useState } from 'react';
import * as authService from '~/services/authService';
import { toast } from 'react-toastify';

const PublicRoute = ({ children }: { children: ReactNode }) => {
    return children;
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{ isAuthenticated: boolean | null; userRole: number | null }>({
        isAuthenticated: null,
        userRole: null,
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authService.authentication();
                if (response.status === 200) {
                    setAuthState({
                        isAuthenticated: true,
                        userRole: response.data.role.keyRole,
                    });
                    Cookies.set('login', '1', { expires: 30 }); // Đặt cookie khi xác thực
                } else {
                    setAuthState({
                        isAuthenticated: false,
                        userRole: null,
                    });
                    Cookies.set('login', '0', { expires: 30 }); // Đặt cookie khi xác thực
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthState({
                    isAuthenticated: false,
                    userRole: null,
                });
            }
        };

        checkAuth();
    }, []);

    if (authState.isAuthenticated === null) {
        return <div>Loading...</div>; // Loading state
    }

    if (authState.isAuthenticated && authState.userRole === 2) {
        return children;
    } else {
        Cookies.remove('login');
        toast.error('Bạn không có quyền để vào trang này vui lòng đăng nhập để vào trang !!!');
        Cookies.remove('jwt'); // Nếu bạn sử dụng JWT cho xác thực, hãy xóa nó
        return <Navigate to="/login" />;
    }
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<{ isAuthenticated: boolean | null; userRole: number | null }>({
        isAuthenticated: null,
        userRole: null,
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await authService.authentication();
                if (response.status === 200) {
                    setAuthState({
                        isAuthenticated: true,
                        userRole: response.data.role.keyRole,
                    });
                    Cookies.set('login', '1', { expires: 30 }); // Đặt cookie khi xác thực
                } else {
                    setAuthState({
                        isAuthenticated: false,
                        userRole: null,
                    });
                    Cookies.set('login', '0', { expires: 30 }); // Đặt cookie khi xác thực
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthState({
                    isAuthenticated: false,
                    userRole: null,
                });
            }
        };

        checkAuth();
    }, []);

    if (authState.isAuthenticated === null) {
        return <div>Loading...</div>; // Loading state
    }
    if (authState.isAuthenticated && authState.userRole === 1) {
        return children;
    } else {
        Cookies.remove('login');
        // toast.error('Bạn không có quyền để vào trang này vui lòng đăng nhập để vào trang !!!');
        Cookies.remove('jwt'); // Nếu bạn sử dụng JWT cho xác thực, hãy xóa nó
        return <Navigate to="/login" />;
    }
};

export { PublicRoute, ProtectedRoute, AdminRoute };
