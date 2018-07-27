import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import * as actions from '../../../../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import spinner from '../../../../../resources/upload/spinner.gif';

class ThumbnailSelect extends Component {

  handleFileDrop(acceptedFiles) {
    if(acceptedFiles[0]) {
      this.props.uploadCustomThumbnail(acceptedFiles[0]);
    }
  }

  render() {
    let thumbnailOptions;
    if(!this.props.thumbnailOptionUrls.length) {
      thumbnailOptions = [];
      for(let i = 0; i < 3; i++) {
        thumbnailOptions.push(
          <div className="ThumbnailSelect__option" key={i}>
            <img src={spinner} className="ThumbnailSelect__spinner" alt="" />
          </div>
        );
      }
    }

    return (
      <div className="ThumbnailSelect">
        <h4>Video Thumbnails</h4>
        <div className="ThumbnailSelect__options">
          {thumbnailOptions}

          <Dropzone accept="image/*" multiple={false} onDrop={this.handleFileDrop.bind(this)} className="ThumbnailSelect__Dropzone">
            Custom thumbnail
          </Dropzone>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { thumbnailOptionUrls } = state.upload;
  return {thumbnailOptionUrls};
}

const { selectUploadThumbnail, uploadCustomThumbnail } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({selectUploadThumbnail, uploadCustomThumbnail}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailSelect);