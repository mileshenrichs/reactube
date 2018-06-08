import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import play from '../resources/player-buttons/play.png';
import pause from'../resources/player-buttons/pause.png';
import volume from '../resources/player-buttons/volume.png';
import settings from '../resources/player-buttons/settings.png';
import theaterMode from '../resources/player-buttons/theater-mode.png';
import fullscreen from '../resources/player-buttons/fullscreen.png';
import playFlash from '../resources/player-buttons/play-flash.png';
import pauseFlash from '../resources/player-buttons/pause-flash.png';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      showControls: false,
      showActionFlash: false
    };
  }

  playOrPause(e) {
    e.stopPropagation(); // propagates to Player click handler

    // switch play state, show action flash and set flash timer
    this.setState((prevState) => ({
      playing: !prevState.playing,
      showActionFlash: true
    }));

    // set timeout to reset action flash state once animation finishes
    const ANIMATION_DURATION = 450; // .45s animation
    setTimeout(() => {
      this.setState({showActionFlash: false});
    }, ANIMATION_DURATION)
  }

  render() {
    let playOrPauseSrc = this.state.playing ? pause : play;
    let actionFlashSrc = this.state.playing ? playFlash : pauseFlash;

    return (
      <div className="Player" 
        onMouseOver={() => this.setState({showControls: true})}
        onMouseOut={() => this.setState({showControls: false})}
        onClick={this.playOrPause.bind(this)}
      >
        <div className={'Player__container' + (this.state.showControls ? ' show-controls' : '')}>
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
                    <span class="control-tooltip">&nbsp;Mute&nbsp;&nbsp;</span>
                  </button>
                  <input type="range" min="0" max="100" onClick={(e) => e.stopPropagation()} />
                  <span id="volume-area-spacer"></span>
                </span>
                <span className="progress-time">2:14 / 10:32</span>
              </span>
            </div>
            <div className="Player__controls--right">
              <button className="control control-settings" title="Settings">
                <img src={settings} alt="" />
                <span class="control-tooltip">Settings</span>
              </button>
              <button className="control control-theatermode">
                <img src={theaterMode} alt="" />
                <span class="control-tooltip">Theater</span>
              </button>
              <button className="control control-fullscreen">
                <img src={fullscreen} alt="" />
                <span class="control-tooltip">Fullscreen</span>
              </button>
            </div>
          </div>
          <div className="Player__top-gradient"></div>
          <div className="Player__bottom-gradient"></div>
        </div>
      </div>
    );
  }
}

export default Player;
