import React, { Component } from 'react';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';
import MenuLink from '../../MenuLink/MenuLink';
import videosIcon from '../../../resources/studio/videos.png';
import commentsIcon from '../../../resources/studio/comments.png';
import settingsIcon from '../../../resources/studio/settings.png';

class StudioSidebar extends Component {
  render() {
    return (
      <div className="StudioSidebar">
        <div className="StudioSidebar__profile-block">
          <ProfileIcon width={112} />
        </div>

        <div className="StudioSidebar__menu">
          <MenuLink imgSrc={videosIcon} text="Videos" url="/" active={window.location.pathname.includes('/videos')} />
          <MenuLink imgSrc={commentsIcon} text="Comments" url="/" active={window.location.pathname.includes('/comments')} />
          <MenuLink imgSrc={settingsIcon} text="Settings" url="/" active={window.location.pathname.includes('/settings')} />
        </div>
      </div>
    );
  }
}

export default StudioSidebar;