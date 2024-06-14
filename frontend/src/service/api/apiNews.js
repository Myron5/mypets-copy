import { instance } from './api';

export const fetchNews = async (query, page, limit) => {
  const searchParams = new URLSearchParams({ query, page, limit });
  const data = await instance.get(`/notices/news?${searchParams}}`);
  return data;
};
