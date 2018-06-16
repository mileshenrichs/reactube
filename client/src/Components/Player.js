import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import FilePlayer from 'react-player/lib/players/FilePlayer';
import screenfull from 'screenfull';
import PlayerTitleBar from '../Components/PlayerTitleBar';
import PlayerProgressBar from '../Components/PlayerProgressBar';
import PlayerControlsBar from '../Components/PlayerControlsBar';
import PlayerSharePanel from '../Components/PlayerSharePanel';
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
   * Called by PlayerProgressBar, uses ReactPlayer's seekTo() method
   * @param {Number} progressPercentage percentage through the video to seek to
   */
  seekTo(progressPercentage) {
    this.reactPlayer.seekTo(progressPercentage);

    // update play progress state immediately (also updates red watch bar)
    this.setState({
      percentPlayed: progressPercentage,
      videoPosition: this.state.videoLength * progressPercentage
    });
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

  render() {
    let actionFlashSrc = this.state.playing ? playFlash : pauseFlash;

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

          <PlayerTitleBar 
            showShareView={this.state.showShareView} 
            toggleShareView={this.toggleShareView.bind(this)} 
          />

          <PlayerProgressBar
            percentPlayed={this.state.percentPlayed}
            percentBuffered={this.state.percentBuffered}
            seekTo={this.seekTo.bind(this)}
          />

          <PlayerControlsBar
            playing={this.state.playing}
            muted={this.state.muted}
            volume={this.state.volume}
            videoPosition={this.state.videoPosition}
            videoLength={this.state.videoLength}
            playerMode={this.state.playerMode}
            showSettingsMenu={this.state.showSettingsMenu}
            playbackSpeed={this.state.playbackSpeed}
            togglePlay={this.playOrPause.bind(this)}
            toggleMute={this.toggleMute.bind(this)}
            changeVolume={(e) => this.setState({volume: e.target.value / 100})}
            toggleSettings={this.toggleSettings.bind(this)}
            toggleFullscreen={this.toggleFullscreen.bind(this)}
            setPlaybackRate={this.setPlaybackRate.bind(this)}
          />

          <PlayerSharePanel />

          <div className="Player__top-gradient"></div>
          <div className="Player__bottom-gradient"></div>
        </div>
      </div>
    );
  }
}

export default Player;
