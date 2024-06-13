import axios from 'axios';
axios.defaults.baseURL = 'https://eventregistry.org/api/v1/article/getArticles';

export const fetchSponsors = async () => {
  return await axios
    .get('https://final-project-node-5vh7.onrender.com/sponsors.json')
    .then(response => response);
};
