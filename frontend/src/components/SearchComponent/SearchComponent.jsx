import React, { useState } from 'react';
import './SearchComponent.scss';

const SearchComponent = ({ onSearch, onClearSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onClearSearch()
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-component" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-component__input"
      />
      <button type="submit" className="search-component__search-button">
        {/* <i className="fas fa-search"></i> */}
        <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
<path d="M19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25V18.75C15.0563 18.75 18.75 15.0563 18.75 10.5H17.25ZM10.5 17.25C6.77208 17.25 3.75 14.2279 3.75 10.5H2.25C2.25 15.0563 5.94365 18.75 10.5 18.75V17.25ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75V2.25C5.94365 2.25 2.25 5.94365 2.25 10.5H3.75ZM10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5H18.75C18.75 5.94365 15.0563 2.25 10.5 2.25V3.75ZM20.5303 19.4697L16.3428 15.2821L15.2821 16.3428L19.4697 20.5303L20.5303 19.4697Z" fill="#54ADFF"/>
  </svg>
      </button>
      {searchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="search-component__clear-button"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </form>
  );
};

export default SearchComponent;
