import axios from 'axios';

const API_URL = 'http://a0836076.xsph.ru/api/';

const getNews = () => {
  return axios.get(API_URL + 'news');
};
const getShedule = (teacher, classname) => {
  return axios.get(API_URL + 'shedule', {
    params: {
      teacher: teacher,
      classname: classname,
    },
  });
};
const getSwaps = (teacher) => {
  return axios.get(API_URL + 'swaps', {
    params: {
      teacher: teacher,
    },
  });
};
const getTeacher = () => {
  return axios.get(API_URL + 'teachers');
};
const getDocs = () => {
  return axios.get(API_URL + 'docs');
};
const getDocById = (documentId) => {
  return axios.get(API_URL + `docs/${documentId}/download`, { responseType: 'blob' });
};
const UserService = {
  getNews,
  getShedule,
  getTeacher,
  getSwaps,
  getDocs,
  getDocById,
};

export default UserService;
