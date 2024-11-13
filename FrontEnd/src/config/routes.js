

const routes = {
    home: '/',

    login: '/login',
    register: '/register',

    user: '/user',
    productmanage: '/productmanage',
    addproduct: '/addproduct',
    editproduct: '/editproduct/:_id',
    search: '/search',
    
    newfeatured: '/newfeatured',
    products: '/products',
    sale: '/sale',

    shoes: '/productmanage/:_id', 
    favourite: '/favourite/:email',
    bag: '/bag',

    nike: 'products/nike',
    jordan: 'products/jordan',
    athletics: 'products/athletics',
    trainingandgym: 'products/trainingandgym',
    running: 'products/running',
    walking: 'products/walking',

};

export default routes;