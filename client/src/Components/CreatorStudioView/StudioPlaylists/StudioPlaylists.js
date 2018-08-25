import React, { Component } from 'react';
import PlaylistRow from './PlaylistRow/PlaylistRow';
import { connect } from 'react-redux';

class StudioPlaylists extends Component {
  componentDidMount() {
    document.title = 'Playlists - Reactube';
  }

  render() {
    // don't include Watch Later playlist
    const createdPlaylists = this.props.userPlaylists.filter(playlist => !playlist.id.includes('PLAWL'));

    return (
      <div className="StudioPlaylists">
        <div className="StudioPlaylists__heading">
          <h2>Playlists (8)</h2>
        </div>

        <div className="StudioPlaylists__list">
          {createdPlaylists.map(playlist => (
            <PlaylistRow key={playlist.id} {...playlist}/>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userPlaylists } = state.playlists;
  return {userPlaylists};
}

export default connect(mapStateToProps)(StudioPlaylists);