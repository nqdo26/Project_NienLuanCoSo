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
import AddProduct from '~/pages/AddProduct';
import EditProduct from '~/pages/EditProduct';

import NewFeatured from '~/pages/NewFeatured';
import Products from '~/pages/Products';
import Sale from '~/pages/Sale';

import Shoes from '~/pages/Shoes';
import Favourite from '~/pages/Favourite';
import Bag from '~/pages/Bag';
import Nike from '~/pages/Nike';
import Jordan from '~/pages/Jordan';
import Athletics from '~/pages/Athletics';
import Running from '~/pages/Running';
import TrainingAndGym from '~/pages/TrainingAndGym';
import Walking from '~/pages/Walking';
import Search from '~/pages/Search';

const publicRoutes = [
    { path: routesConfig.register, component: Register, layout: LoginLayout },
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.home, component: Home },
    { path: routesConfig.user, component: User },
    { path: routesConfig.newfeatured, component: NewFeatured },
    { path: routesConfig.products, component: Products, layout: ProductsLayout },
    { path: routesConfig.nike, component: Nike, layout: ProductsLayout },
    { path: routesConfig.jordan, component: Jordan, layout: ProductsLayout },
    { path: routesConfig.athletics, component: Athletics, layout: ProductsLayout },
    { path: routesConfig.running, component: Running, layout: ProductsLayout },
    { path: routesConfig.trainingandgym, component: TrainingAndGym, layout: ProductsLayout },
    { path: routesConfig.walking, component: Walking, layout: ProductsLayout },
    { path: routesConfig.productmanage, component: ProductManage, layout: ProductsLayout },
    { path: routesConfig.shoes, component: Shoes, layout: ShoesLayout },
    { path: routesConfig.sale, component: Sale },
    { path: routesConfig.favourite, component: Favourite },
    { path: routesConfig.bag, component: Bag },
    { path: routesConfig.addproduct, component: AddProduct },
    { path : routesConfig.editproduct, component: EditProduct },
    { path: routesConfig.search, component: Search, layout: ProductsLayout },


];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
