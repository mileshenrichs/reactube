import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/historyActions';
import { Route, Switch } from 'react-router-dom';
import VideoList from '../VideoList/VideoList';
import HistoryControls from './HistoryControls/HistoryControls';
import SearchHistory from './SearchHistory/SearchHistory';
import CommentHistory from './CommentHistory/CommentHistory';

class HistoryView extends Component {

  componentDidMount() {
    // set page title and background color
    document.title = 'History - Reactube';
    document.body.style.backgroundColor = '#fafafa';
  }

  render() {
    return (
      <div className="HistoryView page-container">
        <div className="feed-container">
          <Switch>
            <Route exact path={this.props.match.path + '/'} render={() => (
              <VideoList 
                videos={this.props.watchedVideos} 
                displayAs="list"
                showTitles={false} 
                showBorders={false}
                includeRemoveButtons={true}
                showTimeSince={false}
                removeVideoFromHistory={this.props.removeVideoFromHistory}
              />
            )} />

            <Route exact path={this.props.match.path + '/search_history'} render={() => (
              <SearchHistory />
            )} />

            <Route exact path={this.props.match.path + '/comment_history'} render={() => (
              <CommentHistory />
            )} />
          </Switch>

          <HistoryControls />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.history;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);