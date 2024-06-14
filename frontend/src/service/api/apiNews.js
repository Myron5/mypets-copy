import { instance } from './api';

export const fetchNews = async (searchNews, page, perPage) => {
  return await instance.get('/notices/news');
};
