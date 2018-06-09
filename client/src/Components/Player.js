import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import PlayerSettingsMenu from '../Components/PlayerSettingsMenu';
import PlayerSharePanel from '../Components/PlayerSharePanel';
import watchLater from '../resources/watch-later.png';
import share from '../resources/player-buttons/share.png';
import close from '../resources/player-buttons/share-buttons/close.png';
import play from '../resources/player-buttons/play.png';
import pause from'../resources/player-buttons/pause.png';
import volume from '../resources/player-buttons/volume.png';
import settings from '../resources/player-buttons/settings.png';
import theaterMode from '../resources/player-buttons/theater-mode.png';
import fullscreen from '../resources/player-buttons/fullscreen.png';
import fullscreenExit from '../resources/player-buttons/fullscreen-exit.png';
import playFlash from '../resources/player-buttons/play-flash.png';
import pauseFlash from '../resources/player-buttons/pause-flash.png';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      showTitle: false,
      showControls: false,
      showActionFlash: false,
      showSettingsMenu: false,
      showShareView: false,
      hideCursor: false,
      playerMode: 'DEFAULT',
      playbackSpeed: 1
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
   *
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
   *
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
   * Event handler for mouse move event inside of video player
   * Show controls & cursor, reset overlays timeout
   *
   * @param {MouseEvent} e click event from play control or Player
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
      if(this.state.playing && !this.state.showSettingsMenu) { 
        this.setState({
          showTitle: false,
          showControls: false,
          hideCursor: true
        });
      }
    }, 3000)
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
          <ReactPlayer 
            className="Player__ReactPlayer"
            url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            width="100%"
            height="100%"
            playing={this.state.playing}
          />

          <div className="Player__action-flash">
            {this.state.showActionFlash && <img src={actionFlashSrc} alt="" />}
          </div>

          <div className="Player__title">
            <span className="title-contents">Big Buck Bunny</span>
            {playerTitleControls}
          </div>

          <div className="Player__progress-bar-outer-container">
            <div className="Player__scrubber"></div>
            <div className="Player__progress-bar-container">
              <div className="Player__progress--watched"></div>
              <div className="Player__progress--buffered"></div>
              <div className="Player__progress--mouse-pos"></div>
            </div>
          </div>

          <div className="Player__controls">
            <div className="Player__controls--left">
              <button className="control control-play" onClick={this.playOrPause.bind(this)}>
                <img src={playOrPauseSrc} alt="" />
              </button>
              <span className="volume-area">
                <span className="volume-area--control">
                  <button className="control control-volume">
                    <img src={volume} alt="" />
                    <span className="control-tooltip">Mute</span>
                  </button>
                  <input type="range" min="0" max="100" onClick={(e) => e.stopPropagation()} />
                  <span id="volume-area-spacer"></span>
                </span>
                <span className="progress-time">2:14 / 10:32</span>
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
              <PlayerSettingsMenu speed={this.state.playbackSpeed} />}
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
