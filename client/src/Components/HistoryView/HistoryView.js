import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/historyActions';
import VideoList from '../VideoList/VideoList';
import HistoryControls from './HistoryControls/HistoryControls';

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
          <VideoList 
            videos={this.props.watchedVideos} 
            showTitles={false} 
            includeRemoveButtons={true}
            showTimeSince={false}
            removeVideoFromHistory={this.props.removeVideoFromHistory}
          />

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