import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: true
    };
  }

  pause() {
    this.setState((prevState) => ({playing: !prevState.playing}));
  }

  render() {
    return (
      <div className="Player">
        <div className="Player__container">
          <ReactPlayer 
            className="Player__ReactPlayer"
            url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            width="100%"
            height="100%"
            playing={this.state.playing}
          />
        </div>

        <button style={{marginTop: '20px'}} onClick={this.pause.bind(this)}>Pause</button>
      </div>
    );
  }
}

export default Player;
