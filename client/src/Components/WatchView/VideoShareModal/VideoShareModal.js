import React, { Component } from 'react';
import { parseStartTimeToQueryString } from '../../../util/dateTimeUtil';
import CheckboxInput from '../../CheckboxInput/CheckboxInput';

class VideoShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useStartAtTime: false,
      startAtTime: '1:07'
    }
  }

  componentDidMount() {
    const fullScreenModal = document.querySelector('.VideoShareModal');
    fullScreenModal.addEventListener('mousedown', this.handleClickWhileModalOpen.bind(this));
  }

  /**
   * close modal if clicked outside
   * @param {MouseEvent} e mousedown event
   */
  handleClickWhileModalOpen(e) {
    if(this.modal && !this.modal.contains(e.target)) {
      this.props.toggleShareModal();
    }
  }

  highlightInput() {
    this.linkInput.select();
  }

  /**
   * Append start at time query string to share URL if "start at" input is checked and provided
   */
  computeURLValue() {
    // todo: replace with a prop with an actual video id
    const videoId = '38duR-xkK';
    let url = 'https://reactu.be/' + videoId;
    
    if(this.state.useStartAtTime && this.state.startAtTime) {
      const queryString = parseStartTimeToQueryString(this.state.startAtTime);
      if(queryString) {
        url += '?t=' + queryString;
      }
    }
    return url;
  }

  /**
   * Called after "start at" time is blurred, reformats times provided in number of
   * seconds greater than 1 minute to mm:ss format
   */
  adjustStartAtInput() {
    let timeInTermsOfMinutes;
    const queryString = parseStartTimeToQueryString(this.state.startAtTime);
    if(!this.state.startAtTime.includes(':') && queryString.includes('m')) {
      // special case if there are no seconds (divisible by 60)
      if(parseInt(this.state.startAtTime, 10) % 60 === 0) {
        timeInTermsOfMinutes = queryString.substring(0, queryString.indexOf('m')) + ':00';
      } else {
        timeInTermsOfMinutes = queryString.substring(0, queryString.indexOf('m')) + ':' 
                                  + queryString.substring(queryString.indexOf('m') + 1, queryString.indexOf('s'));
      }
      this.setState({
        startAtTime: timeInTermsOfMinutes
      });
    }
  }

  copyToClipboard() {
    this.linkInput.focus();
    this.linkInput.select();
  
    // attempt to copy, and if successful, show notification
    try {
      if(document.execCommand('copy')) {
        this.props.copiedToClipboard();
      }
    } catch (err) {}
  }

  startAtCheckboxChanged() {
    this.setState((prevState) => ({
      useStartAtTime: !prevState.useStartAtTime
    }));
  }

  startAtInputTextChanged(e) {
    const nextValue = e.target.value;
    // prevent any non-numeric or time-related characters
    const acceptableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':'];
    for(let i = 0; i < nextValue.length; i++) {
      if(!acceptableChars.includes(nextValue.charAt(i))) {
        return;
      }
    }
    this.setState({startAtTime: nextValue});
  }

  render() {
    let startAtInput;
    if(this.state.useStartAtTime) {
      startAtInput = (
        <input type="text" value={this.state.startAtTime} className="underlined-text-input"
          onChange={this.startAtInputTextChanged.bind(this)} onBlur={this.adjustStartAtInput.bind(this)} />
      );
    } else {
      startAtInput = (
        <span className="start-time-deactivated">{this.state.startAtTime}</span>
      );
    }

    return (
      <div className="VideoShareModal">
        <div className="VideoShareModal__modal interaction-popout" ref={node => this.modal = node}>
          <h3>Share a link</h3>
  
          <div className="VideoShareModal__link-bar">
            <input type="text" value={this.computeURLValue()} readOnly ref={node => this.linkInput = node} 
                onClick={this.highlightInput.bind(this)} onDoubleClick={this.copyToClipboard.bind(this)} />
            
            <button onClick={this.copyToClipboard.bind(this)}>Copy</button>
          </div>

          <div className="VideoShareModal__start-at">
            <CheckboxInput 
              inputId="start-at-checkbox" 
              checked={this.state.useStartAtTime} 
              changeHandler={this.startAtCheckboxChanged.bind(this)}
              labelText="Start at"
            /> {startAtInput}
          </div>
        </div>
      </div>
    );
  }
}

export default VideoShareModal;