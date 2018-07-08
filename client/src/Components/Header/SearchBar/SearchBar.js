import React, { Component } from 'react';
import searchIcon from '../../../resources/header/search.png';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.performSearch(this.state.searchTerm, true)
        }}>
          <input type="text" placeholder="Search" name="search_query"
              value={this.state.searchTerm} onChange={(e) => this.setState({searchTerm: e.target.value})} />
          <button type="submit" className="SearchBar__search-button">
            <img src={searchIcon} alt="" />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;