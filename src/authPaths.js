import facebookApi from './apis/facebook-api';
import Cookies from 'universal-cookie';

const RegisterOrLoginUser = (method, reqBody) => {
    // const cookies = new Cookies();
    // cookies.set('userToken', token);
    if (method==="login") {
        return facebookApi.post("/users/login", reqBody)
    }
    return facebookApi.post("/users", reqBody)
};

const getAuthUser = (path) => {
    const cookies = new Cookies();
    const userToken = cookies.get('userToken');
    return facebookApi.get(`${path}`, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const postAuthUser = (path, object) => {
    const cookies = new Cookies();
    const userToken = cookies.get('userToken');
    return facebookApi.post(`${path}`, object, {
        headers: { Authorization: "Bearer " + userToken },
    });
};


export {
    RegisterOrLoginUser,
    getAuthUser,
    postAuthUser,
}