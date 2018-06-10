import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import FilePlayer from 'react-player/lib/players/FilePlayer';
import screenfull from 'screenfull';
import PlayerSettingsMenu from '../Components/PlayerSettingsMenu';
import PlayerSharePanel from '../Components/PlayerSharePanel';
import watchLater from '../resources/watch-later.png';
import share from '../resources/player-buttons/share.png';
import close from '../resources/player-buttons/share-buttons/close.png';
import play from '../resources/player-buttons/play.png';
import pause from'../resources/player-buttons/pause.png';
import volume from '../resources/player-buttons/volume.png';
import volMuted from '../resources/player-buttons/muted.png';
import settings from '../resources/player-buttons/settings.png';
import theaterMode from '../resources/player-buttons/theater-mode.png';
import fullscreen from '../resources/player-buttons/fullscreen.png';
import fullscreenExit from '../resources/player-buttons/fullscreen-exit.png';
import playFlash from '../resources/player-buttons/play-flash.png';
import pauseFlash from '../resources/player-buttons/pause-flash.png';
import loadingSpinner from '../resources/load-spinner.gif';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      loading: true, // initial buffering of video
      showTitle: false,
      showControls: false,
      showMousePositionBar: false, // whether progress bar should show mousePos bar (only true when hovered)
      progressBarMousePos: 0, // current mouse position in progress bar (if hovered) as decimal percentage
      progressBarMouseDown: false, // keep track of when user holds down mouse on progress bar (for video seeking)
      showActionFlash: false, // action flash = large play/pause icon when playing state changes
      showSettingsMenu: false,
      showShareView: false,
      hideCursor: false,
      playerMode: 'DEFAULT', // DEFAULT, THEATER, or FULLSCREEN
      playbackSpeed: 1, // rate of video playback
      canChangePlaybackSpeed: true,
      volume: 1, // video volume as decimal percentage
      muted: false,
      videoLength: 0, // length in seconds of full video
      videoPosition: 0, // current position in seconds
      percentPlayed: 0, // percentage of video that's been played
      percentBuffered: 0 // video buffer progress as a decimal percentage
    };
  }

  componentDidMount() {
    // add full screen change listener to Player
    if (screenfull.enabled) {
      screenfull.on('change', () => this.fullscreenChanged(screenfull.isFullscreen));
    }
  }

  /**
   * Callback for fullscreen change event, sets state to reflect 
   * current player mode
   * @param {boolean} isFullScreen true if player is full screen
   */
  fullscreenChanged(isFullscreen) {
    const playerMode = isFullscreen ? 'FULLSCREEN' : 'DEFAULT';
    this.setState({
      playerMode,
      showTitle: isFullscreen
    });

    // hide share view, if neccesary
    if(!isFullscreen && this.state.showShareView) {
      this.setState({showShareView: false});
    }
  }

  /**
   * Toggle player "playing" state, trigger action flash animation
   * @param {MouseEvent} e click event from play control or Player
   */
  playOrPause(e) {
    e.stopPropagation(); // propagates to Player click handler

    // switch play state, show action flash and set flash timer
    const newPlayState = !this.state.playing;
    this.setState((prevState) => ({
      playing: !prevState.playing,
      showActionFlash: true
    }));

    // set timeout to reset action flash state once animation finishes
    const ANIMATION_DURATION = 450; // .45s animation
    setTimeout(() => {
      this.setState({showActionFlash: false});
    }, ANIMATION_DURATION)

    // if playing, hide controls & overlays after 3 seconds
    if(newPlayState === true) {
      this.resetOverlaysTimeout();
    }
  }

  /**
   * Click listener for playback rate options in PlayerSettingsMenu
   * @param {MouseEvent} e click event from settings list item
   */
  setPlaybackRate(e) {
    e.stopPropagation(); // propagates to Player click handler
    const playbackValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    // each list item's value attribute stores its index in the playbackValues list
    const selectedSpeed = playbackValues[e.currentTarget.value];

    // set playback speed, then close settings menu
    this.setState({
      playbackSpeed: selectedSpeed,
      showSettingsMenu: false
    });
  }

  /**
   * Callback that fires every second to update video position and buffer progress
   * @param {Object} progress current video position and buffer info
   */
  handleProgress(progress) {
    // prevent extra tick after video has been paused
    if(this.state.playing) {
      this.setState({
        videoPosition: progress.playedSeconds,
        percentPlayed: progress.played,
        percentBuffered: progress.loaded
      });
    }
  }

  /**
   * Event handler for mouse move event inside of video player
   * Show controls & cursor, reset overlays timeout
   */
  handleMouseMove() {
    const isFullscreen = this.state.playerMode === 'FULLSCREEN';
    if(!this.state.showControls) {
      this.setState({
        showTitle: isFullscreen, // only show title in fullscreen mode
        showControls: true,
        hideCursor: false
      });
    }

    this.resetOverlaysTimeout();
  }

  toggleMute(e) {
    e.stopPropagation(); // propagates to Player click handler

    this.setState((prevState) => ({
      muted: !prevState.muted
    }));
  }

  toggleSettings(e) {
    e.stopPropagation(); // propagates to Player click handler

    this.setState((prevState) => ({
      showSettingsMenu: !prevState.showSettingsMenu
    }));
  }

  toggleFullscreen(e) {
    e.stopPropagation(); // propagates to Player click handler

    if(this.state.playerMode !== 'FULLSCREEN') {
      screenfull.request(findDOMNode(this.player));
    } else {
      screenfull.exit();
    }
  }

  toggleShareView(e) {
    e.stopPropagation(); // propagates to Player click handler

    this.setState((prevState) => ({
      showShareView: !prevState.showShareView
    }));
  }

  /**
   * Utility for (re)setting a timeout, which, after 3 seconds,
   * hides control overlays and mouse cursor in the Player
   */
  resetOverlaysTimeout() {
    // clear existing timeout, if necessary
    if(this.hideOverlaysTimeout) {
      clearTimeout(this.hideOverlaysTimeout);
    }

    // establish new timeout
    this.hideOverlaysTimeout = setTimeout(() => {
      // don't hide if paused or interacting with a control
      if(this.state.playing && !this.state.showSettingsMenu && !this.state.showShareView) { 
        this.setState({
          showTitle: false,
          showControls: false,
          hideCursor: true
        });
      }
    }, 3000)
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
    this.reactPlayer.seekTo(progressPercentage);
  }

  /**
   * Util method to calculate mouse/click position as a percentage
   * through the progress bar
   * @param {MouseEvent} e MouseEvent from progress bar
   */
  deriveProgressBarPosition(e) {
    let mousePos = e.clientX;
    
    // get start- and end-points of progress bar as pixels (distance from left edge of screen)
    const progressBarRect = this.progressBarContainer.getBoundingClientRect();
    let barStart = progressBarRect.left;
    let barEnd = progressBarRect.right;

    // calculate percentage through bar of current mouse position
    let progressBarMousePos = (mousePos - barStart) / (barEnd - barStart);

    return progressBarMousePos;
  }

  /**
   * Formats a number of seconds into a time for display, i.e.:
   * 20 => 0:20, 75 => 1:15, 3650 => 1:00:50
   * @param {Number} seconds number of seconds to convert
   */
  formatSecondsToTime(seconds) {
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_MINUTE = 60;
    let secondsRemaining = Math.round(seconds); // seconds left to be converted into hr/min/sec

    // find hours
    const hours = Math.floor(secondsRemaining / SECONDS_IN_HOUR);
    secondsRemaining = secondsRemaining % SECONDS_IN_HOUR;

    // find minutes
    const minutes = Math.floor(secondsRemaining / SECONDS_IN_MINUTE);
    secondsRemaining = secondsRemaining % SECONDS_IN_MINUTE;

    // build and return processed result
    let hoursStr = hours > 0 ? `${hours}:` : '';
    let minutesStr;
    if(minutes > 0) {
      // if no hours, minutes can be returned the way it is
      if(hours === 0) {
        minutesStr = `${minutes}:`;
      } else {
        // if there are hours, make sure minutes is 2 digits
        minutesStr = (minutes < 10 ? '0' : '') + `${minutes}:`;
      }
    } else {
      if(hours === 0) {
        minutesStr = '0:';
      } else {
        minutesStr = '00:';
      }
    }
    let secondsStr = (secondsRemaining < 10 ? '0' : '') + secondsRemaining;

    return hoursStr + minutesStr + secondsStr;
  }

  render() {
    let playOrPauseSrc = this.state.playing ? pause : play;
    let actionFlashSrc = this.state.playing ? playFlash : pauseFlash;
    
    // title controls should have an "x" to close if in share view
    let playerTitleControls;
    if(this.state.showShareView) {
      playerTitleControls = (
        <div className="Player__title-controls">
          <button className="control control-close" onClick={this.toggleShareView.bind(this)}>
            <img src={close} alt="X" />
            <span className="control-tooltip">Close</span>
          </button>
        </div>
      );
    } else {
      playerTitleControls = (
        <div className="Player__title-controls">
          <button className="control control-watchlater">
            <img src={watchLater} alt="" />
            <span className="control-tooltip">Watch Later</span>
          </button>
          <button className="control control-share" onClick={this.toggleShareView.bind(this)}>
            <img src={share} alt="" />
            <span className="control-tooltip">Share</span>
          </button>
        </div>
      );
    }

    // configure progress bar elements based on video & buffer position
    const SCRUBBER_PERCENTAGE_ADJUSTMENT_OFFSET = 0.72; // scrubber pos should always be .72% to the left of percent played
    let progressBarStyles = {
      watched: {
        width: this.state.percentPlayed * 100 + '%'
      },
      buffered: {
        width: Math.round(this.state.percentBuffered * 100) + '%'
      },
      mousePos: {
        display: this.state.showMousePositionBar ? 'block' : 'none',
        width: this.state.progressBarMousePos * 100 + '%'
      },
      scrubber: {
        left: (this.state.percentPlayed * 100 - SCRUBBER_PERCENTAGE_ADJUSTMENT_OFFSET) + '%'
      }
    };

    return (
      <div className="Player" 
        ref={node => this.player = node}
        onMouseOver={() => this.setState({showControls: true, hideCursor: false})}
        onMouseOut={() => {
          if(this.state.playing) {
            this.setState({showControls: false})
          }
        }}
        onMouseMove={this.handleMouseMove.bind(this)}
        onClick={this.playOrPause.bind(this)}
        onDoubleClick={this.toggleFullscreen.bind(this)}
      >
        <div className={'Player__container' 
          + (this.state.showTitle ? ' show-title' : '')
          + (this.state.showControls ? ' show-controls' : '')
          + (this.state.playerMode === 'FULLSCREEN' ? ' fullscreen' : '')
          + (this.state.showSettingsMenu ? ' settings-menu' : '')
          + (this.state.showShareView ? ' share-view' : '')
          + (this.state.hideCursor ? ' hide-cursor' : '')
        }>
          <FilePlayer 
            ref={node => this.reactPlayer = node}
            className="Player__ReactPlayer"
            url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            width="100%"
            height="100%"
            progressInterval={500}
            volume={this.state.volume}
            muted={this.state.muted}
            playbackRate={this.state.playbackSpeed}
            playing={this.state.playing}
            onStart={() => this.setState({loading: false})}
            onDuration={(duration) => this.setState({videoLength: duration})}
            onProgress={this.handleProgress.bind(this)}
          />

          <div className="Player__action-flash">
            {this.state.showActionFlash && <img src={actionFlashSrc} alt="" />}
          </div>

          {this.state.loading && 
            <div className="Player__loading-spinner">
              <img src={loadingSpinner} alt="" />
            </div>}

          <div className="Player__title">
            <span className="title-contents">Big Buck Bunny</span>
            {playerTitleControls}
          </div>

          <div className="Player__progress-bar-outer-container"
            ref={node => this.progressBarContainer = node}
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

          <div className="Player__controls">
            <div className="Player__controls--left">
              <button className="control control-play" onClick={this.playOrPause.bind(this)}>
                <img src={playOrPauseSrc} alt="" />
              </button>
              <span className="volume-area">
                <span className="volume-area--control">
                  <button className="control control-volume" 
                    onClick={this.toggleMute.bind(this)}
                    onDoubleClick={(e) => e.stopPropagation()}
                  >
                    <img src={this.state.muted ? volMuted : volume} alt="" />
                    <span className="control-tooltip">{this.state.muted ? 'Unmute': 'Mute'}</span>
                  </button>
                  <input type="range" min="0" max="100" 
                    value={this.state.muted ? 0 : this.state.volume * 100}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => this.setState({volume: e.target.value / 100})} />
                  <span id="volume-area-spacer"></span>
                </span>
                <span className="progress-time">
                  {this.formatSecondsToTime(this.state.videoPosition)} / {this.formatSecondsToTime(this.state.videoLength)}
                </span>
              </span>
            </div>

            <div className="Player__controls--right">
              <button className="control control-settings" onClick={this.toggleSettings.bind(this)}>
                <img src={settings} alt="" />
                <span className="control-tooltip">Settings</span>
              </button>
              <button className="control control-theatermode">
                <img src={theaterMode} alt="" />
                <span className="control-tooltip">Theater</span>
              </button>
              <button className="control control-fullscreen" onClick={this.toggleFullscreen.bind(this)}>
                <img src={this.state.playerMode !== 'FULLSCREEN' ? fullscreen : fullscreenExit} alt="" />
                <span className="control-tooltip">Fullscreen</span>
              </button>
            </div>

            <div className="clearfix"></div>

            {this.state.showSettingsMenu && 
              <PlayerSettingsMenu 
                speed={this.state.playbackSpeed}
                setPlaybackRate={this.setPlaybackRate.bind(this)} 
              />}
          </div>

          <PlayerSharePanel />

          <div className="Player__top-gradient"></div>
          <div className="Player__bottom-gradient"></div>
        </div>
      </div>
    );
  }
}

export default Player;
