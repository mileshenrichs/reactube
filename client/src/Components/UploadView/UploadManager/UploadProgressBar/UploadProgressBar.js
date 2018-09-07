import React from 'react';
import PropTypes from 'prop-types';

const UploadProgressBar = ({ progressPercentage, uploadComplete }) => {
  let progressBarText = 'Uploading ' + progressPercentage + '%';
  if(progressPercentage == 100) {
    progressBarText = 'Processing...';
  }
  if(uploadComplete) {
    progressBarText = 'Processing Done';
  }

  return (
    <div className="UploadProgressBar">
      <div className="UploadProgressBar__bar" style={{width: progressPercentage + '%'}}></div>
      <span className="UploadProgressBar__text">
        {progressBarText}
      </span>
    </div>
  );
}

UploadProgressBar.propTypes = {
  progressPercentage: PropTypes.number.isRequired
}

export default UploadProgressBar;