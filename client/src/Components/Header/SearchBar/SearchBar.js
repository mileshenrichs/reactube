import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../../actions/appActions'
import searchIcon from '../../../resources/header/search.png';

const SearchBar = ({ searchQuery, performSearch, updateSearchQuery }) => {
    return (
      <div className="SearchBar">
        <form onSubmit={(e) => {
          e.preventDefault();
          performSearch(true);
        }}>
          <input type="text" placeholder="Search" name="search_query"
              value={searchQuery} onChange={(e) => updateSearchQuery(e.target.value)} />
          <button type="submit" className="SearchBar__search-button">
            <img src={searchIcon} alt="" />
          </button>
        </form>
      </div>
    );
}

const mapStateToProps = (state) => {
  const { searchQuery } = state.app;
  return {searchQuery};
}

const { performSearch, updateSearchQuery } = appActions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({performSearch, updateSearchQuery}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);