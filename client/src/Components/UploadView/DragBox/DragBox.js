import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import uploadIcon from '../../../resources/upload/upload.png';
import PrivacyDropdown from '../../PrivacyDropdown/PrivacyDropdown';

class DragBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMessage: false
    }
  }

  handleFileDrop(acceptedFiles, rejectedFiles) {
    if(rejectedFiles.length) {
      this.setState({showErrorMessage: true});
    } else if(acceptedFiles.length === 1) {
      this.setState({showErrorMessage: false});
      this.props.uploadFile(acceptedFiles[0]);
    }
  }

  render() {
    return (
      <div className={'DragBox legacy-page-box' + (this.state.showErrorMessage ? ' showing-error-message' : '')}>
        {this.state.showErrorMessage && 
          <div className="DragBox__error">
            <span style={{fontWeight: 500}}>Invalid file!</span>  Reactube only accepts video files.
          </div>}
        <Dropzone accept="video/*" style={{width: '100%', textAlign: 'center'}} multiple={false} onDrop={this.handleFileDrop.bind(this)}
                  className="DragBox__box" acceptClassName="valid-drag" rejectClassName="invalid-drag">
          <button className="DragBox__upload-button icon-button">
            <img src={uploadIcon} alt="Upload" />
          </button>
  
          <div className="DragBox__text">
            <h2>Select file to upload</h2>
            <h3>Or drag and drop video file</h3>
          </div>
        </Dropzone>
  
        <PrivacyDropdown 
          selectedOption={this.props.selectedPrivacy}
          onSelectOption={(option) => this.props.onPrivacyChanged(option)}
        />
      </div>
    );
  }
}

export default DragBox;