import React from 'react';
import PropTypes from 'prop-types';
import PlayerSettingsMenu from '../PlayerSettingsMenu/PlayerSettingsMenu';
import { formatSecondsToTime } from '../../../util/dateTimeUtil';
import play from '../../../resources/player-buttons/play.png';
import pause from'../../../resources/player-buttons/pause.png';
import volume from '../../../resources/player-buttons/volume.png';
import volMuted from '../../../resources/player-buttons/muted.png';
import settings from '../../../resources/player-buttons/settings.png';
import theaterMode from '../../../resources/player-buttons/theater-mode.png';
import fullscreen from '../../../resources/player-buttons/fullscreen.png';
import fullscreenExit from '../../../resources/player-buttons/fullscreen-exit.png';

const PlayerControlsBar = (props) => {
  return (
    <div className="PlayerControlsBar">
      <div className="PlayerControlsBar--left">
        <button className="control control-play" onClick={props.togglePlay}>
          <img src={props.playing ? pause : play} alt="" />
        </button>
        <span className="volume-area">
          <span className="volume-area--control">
            <button className="control control-volume" 
              onClick={props.toggleMute}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <img src={props.muted ? volMuted : volume} alt="" />
              <span className="control-tooltip">{props.muted ? 'Unmute': 'Mute'}</span>
            </button>
            <input type="range" min="0" max="100" 
              value={props.muted ? 0 : props.volume * 100}
              onClick={(e) => e.stopPropagation()}
              onChange={props.changeVolume} />
            <span id="volume-area-spacer"></span>
          </span>
          <span className="progress-time">
            {formatSecondsToTime(props.videoPosition)} / {formatSecondsToTime(props.videoLength)}
          </span>
        </span>
      </div>

      <div className="PlayerControlsBar--right">
        <button className="control control-settings" onClick={props.toggleSettings}>
          <img src={settings} alt="" />
          <span className="control-tooltip">Settings</span>
        </button>
        <button className="control control-theatermode">
          <img src={theaterMode} alt="" />
          <span className="control-tooltip">Theater</span>
        </button>
        <button className="control control-fullscreen" onClick={props.toggleFullscreen}>
          <img src={props.playerMode !== 'FULLSCREEN' ? fullscreen : fullscreenExit} alt="" />
          <span className="control-tooltip">Fullscreen</span>
        </button>
      </div>

      <div className="clearfix"></div>

      {props.showSettingsMenu && 
        <PlayerSettingsMenu 
          speed={props.playbackSpeed}
          setPlaybackRate={props.setPlaybackRate} 
        />}
    </div>
  );
}

PlayerControlsBar.propTypes = {
  playing: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  videoPosition: PropTypes.number.isRequired,
  videoLength: PropTypes.number.isRequired,
  playerMode: PropTypes.string.isRequired,
  showSettingsMenu: PropTypes.bool.isRequired,
  playbackSpeed: PropTypes.number.isRequired,
  togglePlay: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  changeVolume: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  setPlaybackRate: PropTypes.func.isRequired
};

export default PlayerControlsBar;