import React from 'react';
import PropTypes from 'prop-types';
import watchLater from '../../../resources/watch-later.png';
import share from '../../../resources/player-buttons/share.png';
import close from '../../../resources/player-buttons/share-buttons/close.png';

const PlayerTitleBar = ({ videoTitle, showShareView, toggleShareView }) => {

  // title controls should have an "x" to close if in share view
  let playerTitleControls;
  if(showShareView) {
    playerTitleControls = (
      <div className="PlayerTitleBar-controls">
        <button className="control control-close" onClick={toggleShareView}>
          <img src={close} alt="X" />
          <span className="control-tooltip">Close</span>
        </button>
      </div>
    );
  } else {
    playerTitleControls = (
      <div className="PlayerTitleBar-controls">
        <button className="control control-watchlater">
          <img src={watchLater} alt="" />
          <span className="control-tooltip">Watch Later</span>
        </button>
        <button className="control control-share" onClick={toggleShareView}>
          <img src={share} alt="" />
          <span className="control-tooltip">Share</span>
        </button>
      </div>
    );
  }

  return (
    <div className="PlayerTitleBar">
      <span className="title-contents">{videoTitle}</span>
      {playerTitleControls}
    </div>
  );
}

PlayerTitleBar.propTypes = {
  videoTitle: PropTypes.string.isRequired,
  showShareView: PropTypes.bool.isRequired,
  toggleShareView: PropTypes.func.isRequired
};

export default PlayerTitleBar;
