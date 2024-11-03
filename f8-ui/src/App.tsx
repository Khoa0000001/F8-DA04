import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { publicRoutes, protectedRoutes, adminRoutes } from '~/routes';
import { MainLayout } from './layouts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PublicRoute, ProtectedRoute, AdminRoute } from '~/components/RouteGuards';

function App() {
    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo({
                top: 0,
            });
        }, [pathname]);

        return null;
    };

    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        let Layout: React.ComponentType<any> = MainLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <PublicRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PublicRoute>
                                }
                            />
                        );
                    })}
                    {protectedRoutes.map((route, index) => {
                        const Page = route.component;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        let Layout: React.ComponentType<any> = MainLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}
                    {adminRoutes.map((route, index) => {
                        const Page = route.component;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        let Layout: React.ComponentType<any> = MainLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AdminRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </AdminRoute>
                                }
                            />
                        );
                    })}
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
