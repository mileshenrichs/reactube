import React from 'react';
import VideoListItem from './VideoListItem/VideoListItem';

const VideoList = ({ videos }) => {
  return (
    <div className="VideoList">
      {videos.map(video => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;