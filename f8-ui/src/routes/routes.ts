import Config from '~/config';

import { HeaderOnly } from '~/layouts';
import { VideoLayout } from '~/layouts';
import { NoSearch } from '~/layouts';
import { AuthLayout } from '~/layouts';
import { AdminLayout } from '~/layouts';

// USER
import Home from '~/pages/Home';
import Account from '~/pages/Account';
import RoadMap from '~/pages/RoadMap';
import Blog from '~/pages/Blog';
import Courses from '~/pages/Courses';
import Learning from '~/pages/Learning';
import Blogging from '~/pages/Blogging';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

// ADMIN
import AdStatistical from '~/pages/Admin/Statistical';
import AdListBills from '~/pages/Admin/ListBills';
import AdCourses from '~/pages/Admin/Courses';
import AdLessons from '~/pages/Admin/Lessons';
import AdCategory from '~/pages/Admin/Category';
import AdQuestions from '~/pages/Admin/Questions';
import AdDiscounts from '~/pages/Admin/Discounts';
import AdUsers from '~/pages/Admin/Users';
import AdGroups from '~/pages/Admin/Groups';

const publicRoutes = [
    {
        path: Config.routes.login,
        component: Login,
        layout: AuthLayout,
    },
    {
        path: Config.routes.register,
        component: Register,
        layout: AuthLayout,
    },
    {
        path: Config.routes.home,
        component: Home,
    },
    {
        path: Config.routes.roadmap,
        component: RoadMap,
    },
    {
        path: Config.routes.blog,
        component: Blog,
    },
    {
        path: Config.routes.courses,
        component: Courses,
    },
];

const protectedRoutes = [
    {
        path: Config.routes.learning,
        component: Learning,
        layout: VideoLayout,
    },
    {
        path: Config.routes.account,
        component: Account,
        layout: HeaderOnly,
    },
    {
        path: Config.routes.blogging,
        component: Blogging,
        layout: NoSearch,
    },
];

const adminRoutes = [
    {
        path: Config.routes.adStatistical,
        component: AdStatistical,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adListBills,
        component: AdListBills,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adCourses,
        component: AdCourses,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adCategory,
        component: AdCategory,
        layout: AdminLayout,
    },

    {
        path: Config.routes.adLessons,
        component: AdLessons,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adQuestions,
        component: AdQuestions,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adDiscounts,
        component: AdDiscounts,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adUsers,
        component: AdUsers,
        layout: AdminLayout,
    },
    {
        path: Config.routes.adGroups,
        component: AdGroups,
        layout: AdminLayout,
    },
];

export { publicRoutes, protectedRoutes, adminRoutes };
