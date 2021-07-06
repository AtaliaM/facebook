import facebookApi from './apis/facebook-api';
import Cookies from 'universal-cookie';

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
    getAuthUser,
    postAuthUser,
}