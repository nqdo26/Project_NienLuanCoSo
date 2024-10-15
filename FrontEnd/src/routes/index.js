import routesConfig from '~/config/routes';

// Layouts
import { LoginLayout } from '~/components/Layout';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import NewFeatured from '~/pages/NewFeatured';
import Products from '~/pages/Products';
import Sale from '~/pages/Sale';
import Customise from '~/pages/Customise';
import User from '~/pages/User';

const publicRoutes = [
    { path: routesConfig.register, component: Register, layout: LoginLayout },
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: NewFeatured },
    { path: routesConfig.profile, component: Products },
    { path: routesConfig.upload, component: Sale },
    { path: routesConfig.search, component: Customise },
    { path: routesConfig.user, component: User },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
