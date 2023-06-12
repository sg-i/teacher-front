import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

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
const getTeacher = () => {
  return axios.get(API_URL + 'teachers');
};
const UserService = {
  getNews,
  getShedule,
  getTeacher,
};

export default UserService;
