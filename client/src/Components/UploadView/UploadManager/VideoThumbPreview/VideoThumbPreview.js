import React from 'react';
import spinner from '../../../../resources/upload/spinner.gif';

const VideoThumbPreview = ({ imgSrc }) => {
  return (
    <div className="VideoThumbPreview">
      {!imgSrc && 
        <div className="VideoThumbPreview__loading">
          <img src={spinner} alt="" />
        </div>}
    </div>  
  );
} 

export default VideoThumbPreview;