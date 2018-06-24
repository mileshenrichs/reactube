import React from 'react';
import MenuLink from '../MenuLink/MenuLink';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import menuIcon from '../../resources/header/hamburger-menu.png';
import logo from '../../resources/logo.png';
import homeIcon from '../../resources/left-drawer/home.png';
import fireIcon from '../../resources/left-drawer/fire.png';
import subscriptionsIcon from '../../resources/left-drawer/subscriptions.png';
import historyIcon from '../../resources/left-drawer/watch-history.png';
import watchLaterIcon from '../../resources/left-drawer/watch-later.png';
import likeIcon from '../../resources/left-drawer/thumbs-up.png';
import playlistIcon from '../../resources/left-drawer/playlist.png';
import showMoreIcon from '../../resources/left-drawer/show-more.png';
import morganFreeman from '../../resources/morgan-freeman.jpg';
import settingsIcon from '../../resources/left-drawer/settings.png';

const LeftDrawer = (props) => {
  return (
    <div className="LeftDrawer">
    
      <div className="LeftDrawer__cover"></div>

      <div className="LeftDrawer__drawer">
        <section className="LeftDrawer__header">
          <button className="icon-button LeftDrawer__menu-icon" onClick={props.closeDrawer}>
            <img src={menuIcon} alt="" />
          </button>
          <a href="#">
            <img className="LeftDrawer__logo" src={logo} alt="Reactube" />
          </a>
        </section>

        <section className="LeftDrawer__big-three">
          <MenuLink imgSrc={homeIcon} text="Home" />
          <MenuLink imgSrc={fireIcon} text="Trending" />
          <MenuLink imgSrc={subscriptionsIcon} text="Subscriptions" />
        </section>

        <section className="LeftDrawer__library">
          <h3 className="LeftDrawer__section-heading">
            <a href="#">Library</a>
          </h3>

          <MenuLink imgSrc={historyIcon} text="History" />
          <MenuLink imgSrc={watchLaterIcon} text="Watch Later" />
          <MenuLink imgSrc={likeIcon} text="Liked Videos" />
          <MenuLink imgSrc={playlistIcon} text="Basketball shooting" />
          
          <div className="LeftDrawer__show-more">
            <img src={showMoreIcon} alt="" />
            <span className="MenuLink__text">Show more</span>
          </div>
        </section>

        <section className="LeftDrawer__subscriptions">
          <h3 className="LeftDrawer__section-heading">
            <a href="#">Subscriptions</a>
          </h3>

          <MenuLink text="Morgan Freeman">
            <ProfileIcon width={24} profilePicSrc={morganFreeman} />
          </MenuLink>
          <MenuLink text="Sylvester Stallone">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink text="Rihanna">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink text="Jay-Z">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink text="21 Savage">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink text="Bob Ross">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink text="Will Ferrell">
            <ProfileIcon width={24} />
          </MenuLink>
          
          <div className="LeftDrawer__show-more">
            <img src={showMoreIcon} alt="" />
            <span className="MenuLink__text">Show 285 more</span>
          </div>
        </section>

        <section className="LeftDrawer__settings">
          <MenuLink imgSrc={settingsIcon} text="Settings" />
        </section>

        <section className="LeftDrawer__footer">
          <p>Want to learn more about Reactube? Check out its Github repo <a href="https://github.com/mileshenrichs/reactube">here</a>!</p>
        </section>

      </div>
    </div>
  );
}

export default LeftDrawer;