import { instance } from './api';

export const fetchNews = async (searchNews, page, perPage) => {
  const data = await instance.get(
    `/notices/news?searchNews=${searchNews}&page=${page}&perPage=${perPage}`
  );
  return data;
};
