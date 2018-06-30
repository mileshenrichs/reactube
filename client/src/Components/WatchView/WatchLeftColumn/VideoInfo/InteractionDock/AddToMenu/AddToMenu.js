import React, { Component } from 'react';

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
            <input type="checkbox" onChange={() => this.handleCheckboxClick('PLA9B2660749DA6729')}
                checked={this.props.userPlaylistsContainingVideo.includes('PLA9B2660749DA6729')} />
            <label>Watch Later</label>
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