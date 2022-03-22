import http from './http-common';

export const getAllUsers = () => {
    return http.get("/users");
};

export const getUser = (id) => {
    return http.get(`/users/${id}`);
};

export const createUser = (data) => {
    console.log('createUser=' + JSON.stringify(data));
    return http.post(`/users/`, data);
};

export const updateUser = (id, data) => {
    console.log('updateUser=' + JSON.stringify(data));
    return http.patch(`/users/${id}`, data);
};

export const removeUser = (id) => {
    return http.delete(`/users/${id}`);
};

