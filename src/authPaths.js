import facebookApi from './apis/facebook-api';
import Cookies from 'universal-cookie';

const getCookie = (cookieName) => {
    const cookies = new Cookies();
    const userToken = cookies.get(cookieName);
    return userToken;
}

const RegisterOrLoginUser = (method, reqBody) => {
    if (method === "login") {
        return facebookApi.post("/users/login", reqBody)
    }
    return facebookApi.post("/users", reqBody)
};

const getAuthUser = (path) => {
    const userToken = getCookie('userToken');
    return facebookApi.get(`${path}`, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const postAuthUser = (path, object) => {
    const userToken = getCookie('userToken');
    return facebookApi.post(`${path}`, object, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const patchAuthUser = (path, object) => {
    const userToken = getCookie('userToken');
    return facebookApi.patch(`${path}`, object, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const editAuthPost = (postId, object) => {
    const userToken = getCookie('userToken');
    return facebookApi.patch(`/posts/${postId}`, object, {
        headers: { Authorization: "Bearer " + userToken }
    });
}

const deleteAuthPost = (postId) => {
    const userToken = getCookie('userToken');
    return facebookApi.delete(`/posts/${postId}`, {
        headers: { Authorization: "Bearer " + userToken }
    });
}


export {
    RegisterOrLoginUser,
    getAuthUser,
    postAuthUser,
    patchAuthUser,
    deleteAuthPost,
    editAuthPost,
}