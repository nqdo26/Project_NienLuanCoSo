import routesConfig from '~/config/routes';

// Layouts
import { LoginLayout } from '~/components/Layout';
import { ProductsLayout } from '~/components/Layout';
import { ShoesLayout } from '~/components/Layout';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import NewFeatured from '~/pages/NewFeatured';
import Products from '~/pages/Products';
import Sale from '~/pages/Sale';
import User from '~/pages/User';
import Shoes from '~/pages/Shoes';

const publicRoutes = [
    { path: routesConfig.register, component: Register, layout: LoginLayout },
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.home, component: Home },
    { path: routesConfig.user, component: User },
    { path: routesConfig.newfeatured, component: NewFeatured },
    { path: routesConfig.products, component: Products, layout: ProductsLayout },
    { path: routesConfig.shoes, component: Shoes, layout: ShoesLayout },
    { path: routesConfig.sale, component: Sale },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
