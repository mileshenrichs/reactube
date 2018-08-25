import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';
import MenuLink from '../../MenuLink/MenuLink';
import videosIcon from '../../../resources/studio/videos.png';
import playlistsIcon from '../../../resources/studio/playlists.png';

class StudioSidebar extends Component {
  render() {
    return (
      <div className="StudioSidebar">
        <div className="StudioSidebar__profile-block">
          <ProfileIcon width={112} />
        </div>

        <div className="StudioSidebar__menu">
          <MenuLink imgSrc={videosIcon} text="Videos" url={this.props.matchUrl + '/videos'}
            active={window.location.pathname.includes('/videos')} />
          <MenuLink imgSrc={playlistsIcon} text="Playlists" url={this.props.matchUrl + '/playlists'} 
            active={window.location.pathname.includes('/playlists')} />
        </div>
      </div>
    );
  }
}

StudioSidebar.propTypes = {
  matchUrl: PropTypes.string.isRequired
}

export default StudioSidebar;