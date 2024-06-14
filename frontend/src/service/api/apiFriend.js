import { instance } from './api';

export const fetchSponsors = async () => {
  const data = await instance.get('/sponsors.json');
  return data;
};
