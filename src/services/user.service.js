import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const getNews = () => {
  return axios.get(API_URL + 'news');
};

const UserService = {
  getNews,
};

export default UserService;
