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
    <div className={'LeftDrawer' + (props.displayAsModal ? ' as-modal' : '')}>
    
      {props.displayAsModal && 
        <div className="LeftDrawer__cover"></div>}

      <div className="LeftDrawer__drawer">
        {props.displayAsModal && 
          <section className="menu-section LeftDrawer__header">
            <button className="icon-button LeftDrawer__menu-icon" onClick={props.closeDrawer}>
              <img src={menuIcon} alt="" />
            </button>
            <a href="#">
              <img className="LeftDrawer__logo" src={logo} alt="Reactube" />
            </a>
          </section>}

        <section className="menu-section LeftDrawer__big-three">
          <MenuLink showTitle imgSrc={homeIcon} text="Home" url="/"
                  active={window.location.pathname === '/'} />
          <MenuLink showTitle imgSrc={fireIcon} text="Trending" url="/feed/trending"
                  active={window.location.pathname === '/feed/trending'} />
          <MenuLink showTitle imgSrc={subscriptionsIcon} text="Subscriptions" url="/feed/subscriptions" 
                  active={window.location.href.includes('/feed/subscriptions')} />
        </section>

        <section className="menu-section LeftDrawer__library">
          <h3 className="LeftDrawer__section-heading">
            <a href="#">Library</a>
          </h3>

          <MenuLink showTitle imgSrc={historyIcon} text="History" url="/feed/history"
                  active={window.location.href.includes('/feed/history')} />
          <MenuLink showTitle imgSrc={watchLaterIcon} text="Watch Later" />
          <MenuLink showTitle imgSrc={likeIcon} text="Liked Videos" />
          <MenuLink showTitle imgSrc={playlistIcon} text="Basketball shooting" />
          
          <div className="LeftDrawer__show-more">
            <img src={showMoreIcon} alt="" />
            <span className="MenuLink__text">Show more</span>
          </div>
        </section>

        <section className="menu-section LeftDrawer__subscriptions">
          <h3 className="LeftDrawer__section-heading">
            <a href="#">Subscriptions</a>
          </h3>

          <MenuLink showTitle text="Morgan Freeman">
            <ProfileIcon width={24} profilePicSrc={morganFreeman} />
          </MenuLink>
          <MenuLink showTitle text="Sylvester Stallone">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink showTitle text="Rihanna">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink showTitle text="Jay-Z">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink showTitle text="21 Savage">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink showTitle text="Bob Ross">
            <ProfileIcon width={24} />
          </MenuLink>
          <MenuLink showTitle text="Will Ferrell">
            <ProfileIcon width={24} />
          </MenuLink>
          
          <div className="LeftDrawer__show-more">
            <img src={showMoreIcon} alt="" />
            <span className="MenuLink__text">Show 285 more</span>
          </div>
        </section>

        <section className="menu-section LeftDrawer__settings">
          <MenuLink showTitle imgSrc={settingsIcon} text="Settings" />
        </section>

        <section className="menu-section LeftDrawer__footer">
          <p>Want to learn more about Reactube? Check out its Github repo <a href="https://github.com/mileshenrichs/reactube">here</a>!</p>
        </section>

      </div>
    </div>
  );
}

export default LeftDrawer;