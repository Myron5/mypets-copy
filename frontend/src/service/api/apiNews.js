import axios from 'axios';
axios.defaults.baseURL = 'https://eventregistry.org/api/v1/article/getArticles';
const YOUR_API_KEY = '77852f88-58cb-4ab5-a399-b12e44588c59';

export const fetchNews = async (searchNews, page, perPage) => {
  const searchParams = new URLSearchParams({
    action: 'getArticles',
    keyword: searchNews,
    articlesPage: page,
    articlesCount: perPage,
    articlesSortBy: 'date',
    articlesSortByAsc: false,
    articlesArticleBodyLen: 1000,
    resultType: 'articles',
    dataType: ['news'],
    lang: 'eng',
    apiKey: YOUR_API_KEY,
  });

  return await axios
    .get(`/?${searchParams}`)
    .then(response => {
      return {
        articles: response.data.articles.results,
        pages: response.data.articles.pages,
        info: response.data.info || null,
      };
    })
    .catch(error => error);
};
