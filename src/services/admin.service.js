import axios from 'axios';

const API_URL = 'http://a0836076.xsph.ru/api/';

const addNews = (lastname, firstname, patrotymic, text) => {
  return axios.post(API_URL + 'news/add', { lastname, firstname, patrotymic, text });
};
const dltNews = (id) => {
  return axios.post(API_URL + 'news/delete', { id });
};
const addSwaps = (date, dayOfWeek, oldPeople, newPeople) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 12);
  return axios.post(API_URL + 'swaps/add', {
    date: newDate,
    dayOfWeek,
    oldPeople,
    newPeople,
  });
};

const dltSwaps = (id) => {
  return axios.post(API_URL + 'swaps/delete', { id });
};

const addDocs = (formData) => {
  return axios.post(API_URL + 'docs/add', formData);
};
const dltDocs = (id) => {
  return axios.post(API_URL + 'docs/delete', { id });
};

const getUsers = () => {
  return axios.get(API_URL + 'users/all');
};

const AdminService = {
  addNews,
  dltNews,
  addSwaps,
  addDocs,
  dltDocs,
  dltSwaps,
  getUsers,
};

export default AdminService;
