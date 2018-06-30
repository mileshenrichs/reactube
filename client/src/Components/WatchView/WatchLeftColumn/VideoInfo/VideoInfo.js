import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions/watchActions'
import InteractionDock from './InteractionDock/InteractionDock';

const VideoInfo = ({ userRating, rateVideo, toggleShareModal }) => {
  return (
    <div className="VideoInfo">
      <section className="info-section">
        <h1 className="VideoInfo__video-title">Big Buck Bunny (Season 1, Episode 1)</h1>
        <span className="VideoInfo__view-count">18,901 views</span>

        <InteractionDock 
          userRating={userRating}
          rateVideo={rateVideo} 
          toggleShareModal={toggleShareModal}
        />
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userRating } = state.watch;
  return {userRating};
}

const { rateVideo, toggleShareModal } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({rateVideo, toggleShareModal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoInfo);