import React, { Component } from 'react';
import * as actions from '../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DragBox from './DragBox/DragBox';
import UploadManager from './UploadManager/UploadManager';

class UploadView extends Component {
  
  componentDidMount() {
    document.title = 'Upload - Reactube';
  }

  render() {
    return (
      <div className="UploadView page-container">
        {!this.props.video.file && 
          <DragBox 
            selectedPrivacy={this.props.video.privacy} 
            onPrivacyChanged={(privacy) => this.props.changePrivacyOption(privacy)}
            uploadFile={this.props.uploadVideoFile}
          />}

        {this.props.video.file && 
          <UploadManager />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.upload;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadView);