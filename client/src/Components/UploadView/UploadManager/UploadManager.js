import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VideoThumbPreview from './VideoThumbPreview/VideoThumbPreview';
import UploadProgressBar from './UploadProgressBar/UploadProgressBar';
import notifyIcon from '../../../resources/upload/notify.png';
import BasicInfo from './BasicInfo/BasicInfo';
import Api from '../../../util/Api';

class UploadManager extends Component {
  componentDidMount() {
    // generate id for new video
    Api.getNewGeneratedVideoId().then(({ data }) => {
      const videoId = data.generatedId;

      Api.uploadVideo(videoId, this.props.file).then(({ data }) => {
        // once this request finishes, video is fully uploaded to S3
        this.props.uploadIsComplete();

        // load thumbnails from S3
        if(data.thumbnailsUploaded) {
          data.screenshotTimemarks.forEach((timemark, i) => {
            const thumbnailFileName = videoId + '-' + timemark + '.png';
            Api.getThumbnailImage(thumbnailFileName).then(({ data }) => {
              // convert each thumbnail into a base64 src string and add to redux state
              const thumbnailSrc = "data:image/png;base64," + data.thumbBase64;
              this.props.receivedGeneratedThumbnailOption(i, thumbnailSrc);
            });
          });
        }
      }).catch(err => {
        console.log(err);
      });
  
      // set interval to check on upload progress
      this.progressCheckInterval = setInterval(() => {
        Api.checkUploadProgress(videoId).then(({ data }) => {
          if(data.percentageUploaded !== this.props.progressPercentage) {
            this.props.setPercentageUploaded(data.percentageUploaded);
          }
        });
      }, 2000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.progressCheckInterval);
  }

  render() {
    if(this.props.uploadComplete) {
      clearInterval(this.progressCheckInterval);
    }

    let uploadingMessageText = 'Your video is still uploading.  Please keep this page open until it\'s done.';
    if(this.props.progressPercentage === 100) {
      uploadingMessageText = 'Your video is now processing.  Click "Publish" to make it live!';
    }
    if(this.props.uploadComplete) {
      uploadingMessageText = 'Click "Publish" to make your video live.';
    }

    let uploadStatusText = 'Uploading your video.';
    if(this.props.uploadComplete) {
      uploadStatusText = 'Upload complete!';
    }

    return (
      <div className="UploadManager legacy-page-box">
        <div className="UploadManager__left-column">
          <VideoThumbPreview />
          <div className="UploadManager__upload-status">
            <h3>Upload status:</h3>
            <p>{uploadStatusText}</p>
            <p>Your video will be live at: <br /><Link to="/watch" className="legacy-link">https://reactu.be/{this.props.videoId}</Link></p>
          </div>
        </div>

        <div className="UploadManager__right-column">
          <div className="UploadManager__progress-bar-wrapper">
            <UploadProgressBar 
              progressPercentage={this.props.progressPercentage} 
              uploadComplete={this.props.uploadComplete}
            />
            <button className="UploadManager__publish-button">Publish</button>
          </div>

          <div className="UploadManager__uploading-message">
            <img src={notifyIcon} alt="" />
            <span>{uploadingMessageText}</span>
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