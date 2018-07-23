import React, { Component } from 'react';
import CheckboxInput from '../CheckboxInput/CheckboxInput';
import privateIcon from '../../resources/private.png';
import unlistedIcon from '../../resources/unlisted.png';
import publicIcon from '../../resources/public.png';
import plus from '../../resources/create-new.png';
import PrivacyDropdown from '../PrivacyDropdown/PrivacyDropdown';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/playlistActions';
import PropTypes from 'prop-types';

class AddToMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingPlaylist: false,
      newPlaylistName: '',
      newPlaylistSelectedPrivacy: {
        type: 'PUBLIC',
        optionName: 'Public',
        optionDesc: 'Anyone can search for and view'
      }
    }
  }

  onNewPlaylistNameChanged(e) {
    const newValue = e.target.value;
    if(newValue.length <= 150) {
      this.setState({
        newPlaylistName: newValue
      });
    }
  }

  handlePlaylistRowClick(e, playlistId) {
    e.preventDefault(); // prevent propagation to checkbox

    if(!this.props.userPlaylistsContainingVideo.includes(playlistId)) {
      this.props.addVideoToPlaylist(this.props.videoId, playlistId);
    } else {
      this.props.removeVideoFromPlaylist(this.props.videoId, playlistId);
    }
  }

  handlePrivacyOptionSelected(privacyObj) {
    this.setState({
      newPlaylistSelectedPrivacy: privacyObj
    });
  }

  createPlaylistAndAddVideo() {
    if(this.state.newPlaylistName && this.state.newPlaylistSelectedPrivacy) {
      const newPlaylist = {
        name: this.state.newPlaylistName,
        privacy: this.state.newPlaylistSelectedPrivacy.type
      }
      this.props.createPlaylistAndAddVideo(newPlaylist, this.props.videoId);
    }
  }

  render() {
    // map privacy types to icon img srcs for list of playlists
    const privacyIcons = {
      'PUBLIC': publicIcon,
      'PRIVATE': privateIcon,
      'UNLISTED': unlistedIcon
    };

    let createNewPlaylist;

    if(!this.state.creatingPlaylist) {
      createNewPlaylist = (
        <section className="create-button">
          <button className="AddToMenu__create-new-playlist-button" onClick={() => this.setState({creatingPlaylist: true})}>
            <img src={plus} alt="" />
            <span>Create new playlist</span>
          </button>
        </section>
      );
    } else {
      createNewPlaylist = (
        <section className="AddToMenu__create-form">
          <div className="AddMenu__create-form--input-group">
            <label htmlFor="playlist-name">Name</label>
            <input type="text" id="playlist-name" className="underlined-text-input" placeholder="Enter playlist name..."
                  value={this.state.newPlaylistName} onChange={this.onNewPlaylistNameChanged.bind(this)} />
            <span className="AddToMenu__create-form--charcount">{this.state.newPlaylistName.length}/150</span>
            <div className="clearfix"></div>
          </div>

          <div className="AddMenu__create-form--input-group privacy">
            <label htmlFor="playlist-privacy">Privacy</label>
            <PrivacyDropdown 
              selectedOption={this.state.newPlaylistSelectedPrivacy}
              onSelectOption={this.handlePrivacyOptionSelected.bind(this)}
            />
          </div>

          <button className="AddToMenu__create-form--create-button" onClick={this.createPlaylistAndAddVideo.bind(this)}>
            Create
          </button>
          <div className="clearfix"></div>
        </section>
      );
    }

    return (
      <div className="AddToMenu interaction-popout" ref={node => this.menu = node}>
        <section>
          <span className="AddToMenu__heading">Add to...</span>
        </section>
  
        <section>
          {this.props.userPlaylists.map(playlist => (
              <div className="AddToMenu__playlist-row" key={playlist.id} onClick={(e) => this.handlePlaylistRowClick(e, playlist.id)}>
                <CheckboxInput
                  inputId={playlist.id}
                  checked={this.props.userPlaylistsContainingVideo.includes(playlist.id)}
                  changeHandler={() => null}
                  labelText={playlist.name}
                  checkboxToLabelDistance={11}
                />
                <img src={privacyIcons[playlist.privacy]} alt="" />
              </div>
            )
          )}
        </section>
  
        {createNewPlaylist}
      </div>
    );
  }
}

AddToMenu.propTypes = {
  videoId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  const { userPlaylistsContainingVideo } = state.playlists.addToMenu;
  const { userPlaylists } = state.playlists;
  return {userPlaylistsContainingVideo, userPlaylists};
}

const { addVideoToPlaylist, removeVideoFromPlaylist, createPlaylistAndAddVideo } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addVideoToPlaylist, removeVideoFromPlaylist, createPlaylistAndAddVideo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToMenu);