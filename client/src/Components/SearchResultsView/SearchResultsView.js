import React, { Component } from 'react';
import VideoList from '../VideoList/VideoList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions';
import qs from 'qs';

class SearchResultsView extends Component {

  componentDidMount() {
    // set page title and background color
    document.title = 'Subscriptions - Reactube';
    document.body.style.backgroundColor = '#fafafa';

    // if results haven't been fetched prior to page load, perform search
    if(!this.props.results.length) {
      const searchQuery = qs.parse(this.props.location.search.slice(1)).search_query;
      this.props.performSearch(searchQuery, false);
    }
  }

  render() {
    return (
      <div className="SearchResultsView page-container">
        <div className="feed-container">
          <VideoList 
            videos={this.props.results} 
            showTitles={false} 
            showBorders={false}
            showTimeSince={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.search;
}

const { performSearch } = appActions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({performSearch}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView);