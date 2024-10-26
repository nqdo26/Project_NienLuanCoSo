import routesConfig from '~/config/routes';

// Layouts
import { LoginLayout } from '~/components/Layout';
import { ProductsLayout } from '~/components/Layout';
import { ShoesLayout } from '~/components/Layout';

// Pages
import Home from '~/pages/Home';

import Login from '~/pages/Login';
import Register from '~/pages/Register';

import User from '~/pages/User';
import ProductManage from '~/pages/ProductManage';

import NewFeatured from '~/pages/NewFeatured';
import Products from '~/pages/Products';
import Sale from '~/pages/Sale';

import Shoes from '~/pages/Shoes';
import Favourite from '~/pages/Favourite';
import Bag from '~/pages/Bag';

const publicRoutes = [
    { path: routesConfig.register, component: Register, layout: LoginLayout },
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.home, component: Home },
    { path: routesConfig.user, component: User },
    { path: routesConfig.newfeatured, component: NewFeatured },
    { path: routesConfig.products, component: Products, layout: ProductsLayout },
    { path: routesConfig.productmanage, component: ProductManage, layout: ProductsLayout },
    { path: routesConfig.shoes, component: Shoes, layout: ShoesLayout },
    { path: routesConfig.sale, component: Sale },
    { path: routesConfig.favourite, component: Favourite },
    { path: routesConfig.bag, component: Bag },


];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
