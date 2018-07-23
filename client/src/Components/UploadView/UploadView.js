import React, { Component } from 'react';
import * as actions from '../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DragBox from './DragBox/DragBox';

class UploadView extends Component {
  render() {
    return (
      <div className="UploadView page-container">
        <DragBox 
          selectedPrivacy={this.props.video.privacy} 
          onPrivacyChanged={(privacy) => this.props.changePrivacyOption(privacy)}
          uploadFile={this.props.uploadVideoFile}
        />
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