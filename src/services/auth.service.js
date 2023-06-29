import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

const register = (username, password, role) => {
  return axios.post(API_URL + 'signup', {
    username,
    password,
    role,
  });
};
const changePassword = (userId, newPassword, currentPassword) => {
  return axios.post(API_URL + 'editpassword', {
    userId,
    newPassword,
    currentPassword,
  });
};
const checkAuth = () => {
  return axios.get(API_URL + 'checkAuth');
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  return axios.get(API_URL + 'logout');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  checkAuth,
  login,
  logout,
  getCurrentUser,
  changePassword,
};

export default AuthService;
