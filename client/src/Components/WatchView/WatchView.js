import React from 'react';
import Player from '../Player/Player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/watchActions'
import WatchLeftColumn from './WatchLeftColumn/WatchLeftColumn';
import WatchRightColumn from './WatchRightColumn/WatchRightColumn';
import VideoInfo from './WatchLeftColumn/VideoInfo/VideoInfo';
import VideoComments from './WatchLeftColumn/VideoComments/VideoComments';
import VideoShareModal from './VideoShareModal/VideoShareModal';

const WatchView = (props) => {
  return (
    <div className="WatchView">
      <div className="WatchView__container">
        <WatchLeftColumn>
          <Player />
          <VideoInfo />
          <VideoComments />
        </WatchLeftColumn>

        <WatchRightColumn>
        </WatchRightColumn>
        <div className="clearfix"></div>

        {props.showVideoShareModal && 
          <VideoShareModal 
            copiedToClipboard={props.copiedShareLinkToClipboard}
            toggleShareModal={props.toggleShareModal} />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.watch;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchView);