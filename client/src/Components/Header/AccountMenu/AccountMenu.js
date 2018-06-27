import React from 'react';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';
import MenuLink from '../../MenuLink/MenuLink';
import myChannelIcon from '../../../resources/header/account-menu/my-channel.png';
import creatorStudioIcon from '../../../resources/header/account-menu/creator-studio.png';
import signOutIcon from '../../../resources/header/account-menu/sign-out.png';
import settingsIcon from '../../../resources/left-drawer/settings.png';

const AccountMenu = () => {
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
        <MenuLink imgSrc={myChannelIcon} text="My Channel" />
        <MenuLink imgSrc={creatorStudioIcon} text="Creator Studio" />
        <MenuLink imgSrc={signOutIcon} text="Sign Out" />
      </section>

      <section className="menu-section">
        <MenuLink imgSrc={settingsIcon} text="Settings" />
      </section>
    </div>
  );
}

export default AccountMenu;