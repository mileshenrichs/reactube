import React from 'react';
import VideoListItem from './VideoListItem/VideoListItem';
import PropTypes from 'prop-types';
import PlaylistItem from './PlaylistItem/PlaylistItem';

const VideoList = ({ videos, playlists, displayAs, showTitles, showBorders, 
                    includeRemoveButtons, showTimeSince, removeVideoFromHistory, showCreatorInGrid }) => {

  // distinguish between list of videos vs list of playlists
  let listItems;
  if(videos) {
    listItems = videos.map(video => (
      <VideoListItem 
        key={video.id}
        video={video} 
        displayAs={displayAs}
        showTitle={showTitles} 
        showBorder={showBorders}
        includeRemoveButton={includeRemoveButtons}
        showTimeSince={showTimeSince}
        removeVideoFromHistory={removeVideoFromHistory}
        showCreatorInGrid={showCreatorInGrid}
      />
    ));
  } else {
    listItems = playlists.map(playlist => (
      <PlaylistItem 
        key={playlist.id}
        playlist={playlist}
      />
    ));
  }

  return (
    <div className={'VideoList' + (displayAs === 'list' ? ' as-list' : ' as-grid')}>
      {listItems}
      <div className="clearfix"></div>
    </div>
  );
}

VideoList.propTypes = {
  videos: PropTypes.array,
  playlists: PropTypes.array,
  displayAs: PropTypes.string.isRequired,
  showTitles: PropTypes.bool,
  showBorders: PropTypes.bool,
  includeRemoveButtons: PropTypes.bool,
  showTimeSince: PropTypes.bool,
  removeVideoFromHistory: PropTypes.func,
  showCreatorInGrid: PropTypes.bool
};

VideoList.defaultProps = {
  showTitles: false,
  showBorders: false,
  showTimeSince: false
}

export default VideoList;