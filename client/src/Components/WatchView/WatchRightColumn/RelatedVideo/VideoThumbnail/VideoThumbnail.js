import React from 'react';
import PropTypes from 'prop-types';
import watchLaterIcon from '../../../../../resources/watch-later.png';

const VideoThumbnail = ({ thumbnailSrc, videoLength, watchedProgress }) => {
  return (
    <div className="VideoThumbnail">
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
    </div>
  );
}

VideoThumbnail.propTypes = {
  thumbnailSrc: PropTypes.string.isRequired,
  videoLength: PropTypes.string.isRequired,
  watchedProgress: PropTypes.number
}

export default VideoThumbnail;