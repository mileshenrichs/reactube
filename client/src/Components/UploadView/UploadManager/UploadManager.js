import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoThumbPreview from './VideoThumbPreview/VideoThumbPreview';

class UploadManager extends Component {
  render() {
    return (
      <div className="UploadManager legacy-page-box">
        <div className="UploadManager__left-column">
          <VideoThumbPreview />
          <div className="UploadManager__upload-status">
            <h3>Upload status:</h3>
            <p>Uploading your video.</p>
            <p>Your video will be live at: <br /><Link to="/" className="legacy-link">https://reactu.be/e6-FR_354j</Link></p>
          </div>
        </div>

        <div className="UploadManager__right-column">
          right column
        </div>
      </div>
    );
  }
}

export default UploadManager;