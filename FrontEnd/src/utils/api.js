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

//admin
const createShoesApi = (title, tag, price, numberOfColors, colors, minSize, maxSize, description) => {
    const URL_API = '/v1/api/addproduct';
    const data = {
        title,
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

const getShoesApi = () => {
    const URL_API = '/v1/api/productmanage';
    return axios.get(URL_API);
};

export { createUserApi, loginApi, getUserApi, createShoesApi, getShoesApi};
