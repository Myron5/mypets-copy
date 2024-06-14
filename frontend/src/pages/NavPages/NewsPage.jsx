import { useState, useEffect } from 'react';
import notify from 'service/addPetHelpers/toast';
import NewsList from '../../components/Cards/News/NewsList/NewsList';
import SearchComponent from 'components/SearchComponent/SearchComponent';
import { fetchNews } from 'service/api/apiNews';
import Container from 'components/Container/Container/Container';

import LoaderPet from '../../components/LoaderPet/LoaderPet';

import Paginations from 'components/Pagination/Paginations';
import css from '../../components/Cards/News/NewsList/NewsItems/NewsItems.module.css';

const newsPerPage = 9;

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [newsItems, setNewsItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('pet');
  const [page, setPage] = useState(1);

  const handleSetPage = () => {
    setPage(1);
  };

  const handleSearch = searchTerm => {
    if (searchTerm.trim() !== '') {
      handleSetPage();
      const correctedSearch = searchTerm.toLowerCase();
      setQuery(correctedSearch);
    } else {
      notify.error('Please, Enter the correct request');
    }
  };

  useEffect(async () => {
    try {
      setIsLoading(true);
      const { articles, pages } = await fetchNews(query, page, newsPerPage);
      articles && setNewsItems(articles?.results);
      pages && setPages(pages);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (newsItems.length === 0) setPages(0);
  }, [pages, newsItems.length]);

  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };

  const onClearSearch = () => {
    setQuery('pet');
  };

  return (
    <Container>
      <h1 className={css.textNoticesPage}>News</h1>
      <SearchComponent onSearch={handleSearch} onClearSearch={onClearSearch} />
      {isLoading && <LoaderPet />}
      {error && (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontSize: '2rem',
          }}
        >
          {error?.message}
        </p>
      )}

      {!isLoading && (
        <>
          <NewsList news={newsItems} />
          {newsItems.length !== 0 && (
            <Paginations
              currentPage={page}
              totalPages={pages}
              handlePaginationChange={handlePageChange}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default NewsPage;
