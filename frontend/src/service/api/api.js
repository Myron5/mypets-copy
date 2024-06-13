import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://mypet.up.railway.app',
});

export const setToken = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const deleteToken = () => {
  instance.defaults.headers.common['Authorization'] = '';
};
