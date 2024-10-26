import axios from "./axios.custiomize";

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password
    }

    return axios.post(URL_API, data)
}

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email, password
    }

    return axios.post(URL_API, data)
}

const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API)
}

export {
    createUserApi, loginApi, getUserApi
}