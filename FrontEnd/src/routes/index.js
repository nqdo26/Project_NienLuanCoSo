import routesConfig from '~/config/routes';

// Layouts
import { LoginLayout } from '~/components/Layout';
import { ProductLayout } from '~/components/Layout';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import NewFeatured from '~/pages/NewFeatured';
import Products from '~/pages/Products';
import Sale from '~/pages/Sale';
import User from '~/pages/User';

const publicRoutes = [
    { path: routesConfig.register, component: Register, layout: LoginLayout },
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.home, component: Home },
    { path: routesConfig.user, component: User },
    { path: routesConfig.newfeatured, component: NewFeatured },
    { path: routesConfig.products, component: Products, layout: ProductLayout },
    { path: routesConfig.sale, component: Sale },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
