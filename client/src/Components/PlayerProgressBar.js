import React, { Component } from 'react';

class PlayerProgressBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMousePositionBar: false, // whether progress bar should show mousePos bar (only true when hovered)
      progressBarMousePos: 0, // current mouse position in progress bar (if hovered) as decimal percentage
      progressBarMouseDown: false, // keep track of when user holds down mouse on progress bar (for video seeking)
    }
  }

  /**
   * Event handler for mouse movement inside of progress bar, sets mouse position
   * @param {MouseEvent} e onMouseMove event from progress bar
   */
  updateMousePos(e) {
    let progressBarMousePos = this.deriveProgressBarPosition(e);
    this.setState({progressBarMousePos});

    // if mouse held down, need to handle seek
    if(this.state.progressBarMouseDown) {
      this.handleSeek(e);
    }
  }

  /**
   * Get progress bar location as percentage and seek to desired time in video
   * @param {MouseEvent} e onMouseMove or onClick event from progress bar
   */
  handleSeek(e) {
    e.stopPropagation(); // propagates to Player click handler

    let progressPercentage = this.deriveProgressBarPosition(e);
    this.props.seekTo(progressPercentage);
  }

  /**
   * Util method to calculate mouse/click position as a percentage
   * through the progress bar
   * @param {MouseEvent} e MouseEvent from progress bar
   */
  deriveProgressBarPosition(e) {
    let mousePos = e.clientX;
    
    // get start- and end-points of progress bar as pixels (distance from left edge of screen)
    const progressBarRect = this.progressBar.getBoundingClientRect();
    let barStart = progressBarRect.left;
    let barEnd = progressBarRect.right;

    // calculate percentage through bar of current mouse position
    let progressBarMousePos = (mousePos - barStart) / (barEnd - barStart);

    return progressBarMousePos;
  }

  render() {
    // configure progress bar elements based on video & buffer position
    const SCRUBBER_PERCENTAGE_ADJUSTMENT_OFFSET = 0.72; // scrubber pos should always be .72% to the left of percent played
    let progressBarStyles = {
      watched: {
        width: this.props.percentPlayed * 100 + '%'
      },
      buffered: {
        width: Math.round(this.props.percentBuffered * 100) + '%'
      },
      mousePos: {
        display: this.state.showMousePositionBar ? 'block' : 'none',
        width: this.state.progressBarMousePos * 100 + '%'
      },
      scrubber: {
        left: (this.props.percentPlayed * 100 - SCRUBBER_PERCENTAGE_ADJUSTMENT_OFFSET) + '%'
      }
    };

    return (
      <div className="PlayerProgressBar" 
        ref={node => this.progressBar = node}
        onMouseEnter={() => this.setState({showMousePositionBar: true})}
        onMouseMove={this.updateMousePos.bind(this)}
        onMouseLeave={() => this.setState({showMousePositionBar: false})}
        onClick={this.handleSeek.bind(this)}
        onMouseDown={() => this.setState({progressBarMouseDown: true})}
        onMouseUp={() => this.setState({progressBarMouseDown: false})}
      >
        <div className="Player__scrubber" style={progressBarStyles.scrubber}></div>
        <div className="Player__progress-bar-container">
          <div className="Player__progress--watched" style={progressBarStyles.watched}></div>
          <div className="Player__progress--buffered" style={progressBarStyles.buffered}></div>
          <div className="Player__progress--mouse-pos" style={progressBarStyles.mousePos}></div>
        </div>
      </div>
    );
  }
}

export default PlayerProgressBar;