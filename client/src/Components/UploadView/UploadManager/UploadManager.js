import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VideoThumbPreview from './VideoThumbPreview/VideoThumbPreview';
import UploadProgressBar from './UploadProgressBar/UploadProgressBar';
import notifyIcon from '../../../resources/upload/notify.png';
import BasicInfo from './BasicInfo/BasicInfo';

class UploadManager extends Component {
  render() {
    return (
      <div className="UploadManager legacy-page-box">
        <div className="UploadManager__left-column">
          <VideoThumbPreview />
          <div className="UploadManager__upload-status">
            <h3>Upload status:</h3>
            <p>Uploading your video.</p>
            <p>Your video will be live at: <br /><Link to="/watch" className="legacy-link">https://reactu.be/{this.props.videoId}</Link></p>
          </div>
        </div>

        <div className="UploadManager__right-column">
          <div className="UploadManager__progress-bar-wrapper">
            <UploadProgressBar progressPercentage={0.73} />
            <button className="UploadManager__publish-button">Publish</button>
          </div>

          <div className="UploadManager__uploading-message">
            <img src={notifyIcon} alt="" />
            <span>Your video is still uploading.  Please keep this page open until it's done.</span>
          </div>

          <BasicInfo 
            title={this.props.title}
            updateTitle={(title) => this.props.updateVideoTitle(title)}
            description={this.props.description}
            updateDescription={(description) => this.props.updateVideoDescription(description)}
            selectedPrivacy={this.props.privacy}
            onSelectPrivacyOption={(option) => this.props.changePrivacyOption(option)}
            videoId={this.props.videoId}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.upload;

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UploadManager);