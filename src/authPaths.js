import http from './apis/facebook-api';

const getAuthUser = (path, token) => {
    return http.get(`/${path}`, {
        headers: { Authorization: "Bearer " + token },
    });
};

const postAuthUser = (path, token) => {
    return http.post(`/${path}`, {
        headers: { Authorization: "Bearer " + token },
    });
};


// const patch = (id, data) => {
//     return http.patch(`/${id}`, data);
// };

// const remove = (id) => {
//     return http.delete(`/${id}`);
// };

export {
    getAuthUser,
    // remove,
    // patch,
    postAuthUser,
}