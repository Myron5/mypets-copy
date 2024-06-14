import { instance } from './api';

export const fetchNews = async (searchNews, page, perPage) => {
  const obj = { searchNews, page, perPage };
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
  const searchParams = new URLSearchParams(filteredObj);
  const data = await instance.get(`/notices/news?${searchParams}}`);
  return data;
};
