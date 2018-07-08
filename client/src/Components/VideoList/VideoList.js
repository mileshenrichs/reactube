import React from 'react';
import VideoListItem from './VideoListItem/VideoListItem';
import PropTypes from 'prop-types';

const VideoList = ({ videos, showTitles, showBorders, includeRemoveButtons, showTimeSince, removeVideoFromHistory }) => {
  return (
    <div className="VideoList">
      {videos.map(video => (
        <VideoListItem 
          key={video.id}
          video={video} 
          showTitle={showTitles} 
          showBorder={showBorders}
          includeRemoveButton={includeRemoveButtons}
          showTimeSince={showTimeSince}
          removeVideoFromHistory={removeVideoFromHistory}
        />
      ))}
    </div>
  );
}

VideoList.propTypes = {
  videos: PropTypes.array.isRequired,
  showTitles: PropTypes.bool.isRequired,
  showBorders: PropTypes.bool.isRequired,
  includeRemoveButtons: PropTypes.bool,
  showTimeSince: PropTypes.bool.isRequired,
  removeVideoFromHistory: PropTypes.func
};

export default VideoList;