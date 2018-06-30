import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions/watchActions'
import InteractionDock from './InteractionDock/InteractionDock';

const VideoInfo = ({ userRating, rateVideo, toggleShareModal, addVideoToPlaylist, userPlaylistsContainingVideo, removeVideoFromPlaylist }) => {
  return (
    <div className="VideoInfo">
      <section className="info-section">
        <h1 className="VideoInfo__video-title">Big Buck Bunny (Season 1, Episode 1)</h1>
        <span className="VideoInfo__view-count">18,901 views</span>

        <InteractionDock 
          userRating={userRating}
          rateVideo={rateVideo} 
          toggleShareModal={toggleShareModal}
          userPlaylistsContainingVideo={userPlaylistsContainingVideo}
          addVideoToPlaylist={addVideoToPlaylist}
          removeVideoFromPlaylist={removeVideoFromPlaylist}
        />
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userRating, userPlaylistsContainingVideo } = state.watch;
  return {userRating, userPlaylistsContainingVideo};
}

const { rateVideo, toggleShareModal, addVideoToPlaylist, removeVideoFromPlaylist } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({rateVideo, toggleShareModal, addVideoToPlaylist, removeVideoFromPlaylist}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoInfo);