import React from 'react';
import PropTypes from 'prop-types';

const UploadProgressBar = ({ progressPercentage }) => {
  return (
    <div className="UploadProgressBar">
      <div className="UploadProgressBar__bar" style={{width: (progressPercentage * 100) + '%'}}></div>
      <span className="UploadProgressBar__text">
        Uploading {(progressPercentage * 100)}%
      </span>
    </div>
  );
}

UploadProgressBar.propTypes = {
  progressPercentage: PropTypes.number.isRequired
}

export default UploadProgressBar;