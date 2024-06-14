import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://mypet.up.railway.app',
  // baseURL: 'http://localhost:3003',
});

export const setToken = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const deleteToken = () => {
  instance.defaults.headers.common['Authorization'] = '';
};
