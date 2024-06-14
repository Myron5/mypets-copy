import { instance } from './api';

export const fetchNews = async (searchNews, page, perPage) => {
  const searchParams = new URLSearchParams({ searchNews, page, perPage });
  const data = await instance.get(`/notices/news?${searchParams}}`);
  return data;
};
