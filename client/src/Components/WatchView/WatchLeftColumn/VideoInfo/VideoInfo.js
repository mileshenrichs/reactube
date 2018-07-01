import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions/watchActions'
import InteractionDock from './InteractionDock/InteractionDock';

const VideoInfo = (props) => {
  return (
    <div className="VideoInfo">
      <section className="info-section">
        <h1 className="VideoInfo__video-title">Big Buck Bunny (Season 1, Episode 1)</h1>
        <span className="VideoInfo__view-count">18,901 views</span>

        <InteractionDock 
          userRating={props.userRating}
          rateVideo={props.rateVideo} 
          toggleShareModal={props.toggleShareModal}
          userPlaylistsContainingVideo={props.userPlaylistsContainingVideo}
          addVideoToPlaylist={props.addVideoToPlaylist}
          removeVideoFromPlaylist={props.removeVideoFromPlaylist}
          userPlaylists={props.userPlaylists}
        />
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userRating, userPlaylistsContainingVideo } = state.watch;
  const userPlaylists = state.user.playlists;
  return {userRating, userPlaylistsContainingVideo, userPlaylists};
}

const { rateVideo, toggleShareModal, addVideoToPlaylist, removeVideoFromPlaylist } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({rateVideo, toggleShareModal, addVideoToPlaylist, removeVideoFromPlaylist}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoInfo);