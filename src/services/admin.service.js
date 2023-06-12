import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const addNews = (lastname, firstname, patrotymic, text) => {
  return axios.post(API_URL + 'news/add', { lastname, firstname, patrotymic, text });
};
const dltNews = (id) => {
  return axios.post(API_URL + 'news/delete', { id });
};
const AdminService = {
  addNews,
  dltNews,
};

export default AdminService;
