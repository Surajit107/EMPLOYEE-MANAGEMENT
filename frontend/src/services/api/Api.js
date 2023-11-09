import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

// login
export const LOGIN = (data) => API.post('/user/login', data);
// register
export const REGISTER = (data) => API.post('/user/signup', data);
// add department
export const ADD_DEPARTMENT = (data, header) => API.post('/add/department', data, header);
// all department
export const ALL_DEPARTMENT = () => API.get('/get/all/department');
// update department
export const UPDATE_DEPARTMENT = (id, data, header) => API.post('/update/department/' + id, data, header);
// delete department
export const DELETE_DEPARTMENT = (id, header) => API.post('/delete/department/' + id, header);
// all department
export const ALL_EMPLOYEE = () => API.get('/get/all/employee');
// update user department
export const UPDATE_USER_DEPARTMENT = (id, data, header) => API.post('/update/user/department/' + id, data, header);
// filter user name
export const FILTER_NAME = (type, header) => API.post('/filter/name/' + type, header);
// update user location
export const FILTER_LOCATION = (type, header) => API.post('/filter/location/' + type, header);
