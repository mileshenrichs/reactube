import React from 'react';
import VideoListItem from './VideoListItem/VideoListItem';
import PropTypes from 'prop-types';

const VideoList = ({ videos, displayAs, showTitles, showBorders, includeRemoveButtons, showTimeSince, removeVideoFromHistory }) => {
  return (
    <div className={'VideoList' + (displayAs === 'list' ? ' as-list' : ' as-grid')}>
      {videos.map(video => (
        <VideoListItem 
          key={video.id}
          video={video} 
          displayAs={displayAs}
          showTitle={showTitles} 
          showBorder={showBorders}
          includeRemoveButton={includeRemoveButtons}
          showTimeSince={showTimeSince}
          removeVideoFromHistory={removeVideoFromHistory}
        />
      ))}
      <div className="clearfix"></div>
    </div>
  );
}

VideoList.propTypes = {
  videos: PropTypes.array.isRequired,
  displayAs: PropTypes.string.isRequired,
  showTitles: PropTypes.bool,
  showBorders: PropTypes.bool,
  includeRemoveButtons: PropTypes.bool,
  showTimeSince: PropTypes.bool,
  removeVideoFromHistory: PropTypes.func
};

VideoList.defaultProps = {
  showTitles: false,
  showBorders: false,
  showTimeSince: false
}

export default VideoList;