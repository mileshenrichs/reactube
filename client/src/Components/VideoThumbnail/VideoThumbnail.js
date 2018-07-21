import React from 'react';
import PropTypes from 'prop-types';
import watchLaterIcon from '../../resources/watch-later.png';
import playIcon from '../../resources/player-buttons/play.png';
import playlistIcon from '../../resources/playlist.png';

const VideoThumbnail = ({ width, thumbnailSrc, videoLength, watchedProgress, playlistVideoCount }) => {
  return (
    <div className="VideoThumbnail" style={{width}}>
      <img src={thumbnailSrc} alt="" />
      <span className="VideoThumbnail__watch-later">
        <img src={watchLaterIcon} alt="" />
      </span>
      <span className="VideoThumbnail__video-length">{videoLength}</span>

      {watchedProgress > 0 && 
        <span className="VideoThumbnail__watched-progress">
          <span className="bar-bg"></span>
          <span className="bar-progress" style={{width: (watchedProgress * 100) + '%'}}></span>
        </span>}

      {playlistVideoCount && 
        <div className="VideoThumbnail__playlist-overlay">
          <div className="VideoThumbnail__playlist-overlay--full-overlay">
            <span>
              <img src={playIcon} alt="" />
              Play all
            </span>
          </div>

          <div className="VideoThumbnail__playlist-overlay--video-count">
            <span>{playlistVideoCount}</span>
            <img src={playlistIcon} alt="" />
          </div>
        </div>}
    </div>
  );
}

VideoThumbnail.propTypes = {
  width: PropTypes.number.isRequired,
  thumbnailSrc: PropTypes.string.isRequired,
  videoLength: PropTypes.string,
  watchedProgress: PropTypes.number,
  playlistVideoCount: PropTypes.number
}

export default VideoThumbnail;