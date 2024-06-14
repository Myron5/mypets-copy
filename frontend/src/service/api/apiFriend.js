import { instance } from './api';

export const fetchSponsors = async () => {
  return await instance.get('/sponsors.json');
};
