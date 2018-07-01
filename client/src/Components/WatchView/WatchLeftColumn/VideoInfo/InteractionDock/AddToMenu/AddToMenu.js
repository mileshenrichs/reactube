import React, { Component } from 'react';
import CheckboxInput from '../../../../../CheckboxInput/CheckboxInput';

class AddToMenu extends Component {

  handleCheckboxClick(playlistId) {
    if(!this.props.userPlaylistsContainingVideo.includes(playlistId)) {
      this.props.addVideoToPlaylist('aHlwbm9zaXM', playlistId);
    } else {
      this.props.removeVideoFromPlaylist('aHlwbm9zaXM', playlistId);
    }
  }

  render() {
    return (
      <div className="AddToMenu interaction-popout">
        <section>
          <span className="AddToMenu__heading">Add to...</span>
        </section>
  
        <section>
          <div className="AddToMenu__playlist-row">
            <CheckboxInput
              inputId="PLA9B2660749DA6729"
              checked={this.props.userPlaylistsContainingVideo.includes('PLA9B2660749DA6729')}
              changeHandler={() => this.handleCheckboxClick('PLA9B2660749DA6729')}
              labelText="Watch Later"
              checkboxToLabelDistance={11}
            />
          </div>
        </section>
  
        <section>
          Create new playlist
        </section>
      </div>
    );
  }
}

export default AddToMenu;