import axios from './axios.custiomize';

//user
const createUserApi = (name, email, password) => {
    const URL_API = '/v1/api/register';
    const data = {
        name,
        email,
        password,
    };

    return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
    const URL_API = '/v1/api/login';
    const data = {
        email,
        password,
    };

    return axios.post(URL_API, data);
};

const getUserApi = () => {
    const URL_API = '/v1/api/user';
    return axios.get(URL_API);
};

const addFavouriteApi = (email, title, tag, price, numberOfColors, shoesId) => {
    const URL_API = '/v1/api/favourite/' + email;
    const data = {
        email,
        title,
        tag,
        price,
        numberOfColors,
        shoesId,
    };
    return axios.post(URL_API, data);
};

const getListFavourtiteApi = (email) => {
    const URL_API = '/v1/api/favourite/' + email;
    return axios.get(URL_API);
};

const deleteFavouriteApi = (_id) => {
    const URL_API = '/v1/api/favourite/';
    return axios.delete(URL_API, { data: { _id } });
};

//admin
const createShoesApi = (title, type, tag, price, numberOfColors, colors, minSize, maxSize, description) => {
    const URL_API = '/v1/api/addproduct';
    const data = {
        title,
        type,
        tag,
        price,
        numberOfColors,
        colors,
        minSize,
        maxSize,
        description,
    };
    return axios.post(URL_API, data);
};

const getListShoesApi = () => {
    const URL_API = '/v1/api/productmanage';
    return axios.get(URL_API);
};

const getShoesApi = (_id) => {
    const URL_API = '/v1/api/productmanage/' + _id;
    return axios.get(URL_API);
};

const getShoesApiForEdit = (_id) => {
    const URL_API = '/v1/api/editproduct/' + _id;
    return axios.get(URL_API);
};

const updateShoesApi = (_id, title, type, tag, price, numberOfColors, colors, minSize, maxSize, description) => {
    const URL_API = '/v1/api/editproduct/' + _id;
    const data = {
        title,
        type,
        tag,
        price,
        numberOfColors,
        colors,
        minSize,
        maxSize,
        description,
    };
    return axios.put(URL_API, data);
};

const deleteShoesApi = (_id) => {
    const URL_API = '/v1/api/productmanage/' + _id;
    return axios.delete(URL_API);
};

const getShoesByTypeApi = (type) => {
    const URL_API = '/v1/api/products/' + type;
    return axios.get(URL_API);
};

const searchShoesApi = (title) => {
    const URL_API = `/v1/api/search`;
    return axios.get(URL_API, {
        params: {
            title,
        },
    });
};

export {
    createUserApi,
    loginApi,
    getUserApi,
    createShoesApi,
    getListShoesApi,
    getShoesApi,
    getShoesApiForEdit,
    updateShoesApi,
    deleteShoesApi,
    addFavouriteApi,
    getListFavourtiteApi,
    deleteFavouriteApi,
    getShoesByTypeApi,
    searchShoesApi,
};
