const routes = {
    home: '/',

    login: '/login',
    register: '/register',

    user: '/user',
    productmanage: '/productmanage',
    addproduct: '/addproduct',
    editproduct: '/editproduct/:_id',
    
    newfeatured: '/newfeatured',
    products: '/products',
    sale: '/sale',

    shoes: '/productmanage/:_id', 
    favourite: '/favourite/:email',
    bag: '/bag',
};

export default routes;