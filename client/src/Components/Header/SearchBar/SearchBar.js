import React from 'react';
import searchIcon from '../../../resources/header/search.png';

const SearchBar = ({ searchTerm, handleSearchTermChange }) => {
  return (
    <div className="SearchBar">
      <form>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchTermChange} />
        <button type="submit" className="SearchBar__search-button">
          <img src={searchIcon} alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;