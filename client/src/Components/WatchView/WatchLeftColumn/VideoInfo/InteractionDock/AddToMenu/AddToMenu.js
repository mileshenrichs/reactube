import React, { Component } from 'react';
import CheckboxInput from '../../../../../CheckboxInput/CheckboxInput';
import privateIcon from '../../../../../../resources/private.png';
import publicIcon from '../../../../../../resources/public.png';
import plus from '../../../../../../resources/create-new.png';

class AddToMenu extends Component {

  handlePlaylistRowClick(e, playlistId) {
    e.preventDefault(); // prevent propagation to checkbox

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
          {this.props.userPlaylists.map(playlist => {
            return (
              <div className="AddToMenu__playlist-row" key={playlist.id} onClick={(e) => this.handlePlaylistRowClick(e, playlist.id)}>
                <CheckboxInput
                  inputId={playlist.id}
                  checked={this.props.userPlaylistsContainingVideo.includes(playlist.id)}
                  labelText={playlist.name}
                  checkboxToLabelDistance={11}
                />
                <img src={playlist.private ? privateIcon : publicIcon} alt="" />
              </div>
            );
          })}
        </section>
  
        <section>
          <button className="AddToMenu__create-new-playlist-button">
            <img src={plus} alt="" />
            <span>Create new playlist</span>
          </button>
        </section>
      </div>
    );
  }
}

export default AddToMenu;