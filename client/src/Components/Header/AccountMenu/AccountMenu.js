import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';
import MenuLink from '../../MenuLink/MenuLink';
import myChannelIcon from '../../../resources/header/account-menu/my-channel.png';
import creatorStudioIcon from '../../../resources/header/account-menu/creator-studio.png';
import grayReactubeLogo from '../../../resources/header/account-menu/gray-reactube-logo.png';
import signOutIcon from '../../../resources/header/account-menu/sign-out.png';
import settingsIcon from '../../../resources/left-drawer/settings.png';

const AccountMenu = ({ isCreatorStudio, userChannelId }) => {
  return (
    <div className="AccountMenu">
      <a href="#">
        <div className="AccountMenu__header">
          <div className="AccountMenu__header--profile-icon">
            <ProfileIcon width={40} />
          </div>
          <div className="AccountMenu__header--account-details">
            <h3>Snooz.</h3>
            <span>mileshdesign@gmail.com</span>
          </div>
        </div>
      </a>

      <section className="menu-section">
        <MenuLink showTitle imgSrc={myChannelIcon} text="My Channel" />
        {!isCreatorStudio && 
          <MenuLink showTitle url={'/studio/channel/' + userChannelId + '/videos'} imgSrc={creatorStudioIcon} text="Creator Studio" />}
        {isCreatorStudio && 
          <MenuLink showTitle url="/" imgSrc={grayReactubeLogo} text="Back to Reactube" />}
        <MenuLink showTitle imgSrc={signOutIcon} text="Sign Out" />
      </section>

      <section className="menu-section settings-link">
        <MenuLink showTitle imgSrc={settingsIcon} text="Settings" />
      </section>
    </div>
  );
}

AccountMenu.propTypes = {
  isCreatorStudio: PropTypes.bool.isRequired
}

export default AccountMenu;