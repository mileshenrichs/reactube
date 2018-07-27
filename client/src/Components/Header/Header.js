import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions'
import { Link } from 'react-router-dom';
import logo from '../../resources/logo.png';
import creatorStudioLogo from '../../resources/studio-logo.png';
import menuIcon from '../../resources/header/hamburger-menu.png';
import cameraIcon from '../../resources/header/create-video.png';
import cameraIconLight from '../../resources/header/create-video-light.png';
import AccountMenu from './AccountMenu/AccountMenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveringUploadIcon: false
    };
  }

  /**
   * Click listener, closes account menu if clicked outside
   * @param {MouseEvent} e mousedown event
   */
  handleClickWhileAccountMenuOpen = (e) => {
    const accountMenu = document.querySelector('.AccountMenu');
    const headerProfileIcon = document.querySelector('.Header .ProfileIcon');
    if (accountMenu && !accountMenu.contains(e.target) && !headerProfileIcon.contains(e.target)) {
      this.props.toggleAccountMenu();
    }
  }

  render() {
    if(this.props.showAccountMenu) {
      document.addEventListener('mousedown', this.handleClickWhileAccountMenuOpen);
    } else {
      document.removeEventListener('mousedown', this.handleClickWhileAccountMenuOpen);
    }

    let headerLogo;
    if(this.props.isCreatorStudio) {
      headerLogo = (
        <img className="Header__logo" src={creatorStudioLogo} alt="Reactube Studio" />
      );
    } else {
      headerLogo = (
        <Link to="/">
          <img className="Header__logo" src={logo} alt="Reactube" />
        </Link>
      );
    }

    return (
      <div className={'Header' + (this.props.isCreatorStudio ? ' is-creator-studio' : '')}>
        <div className="Header__container">
          <div className="Header__left-dock">
            {!this.props.isCreatorStudio && 
              <button className="icon-button Header__menu-icon" onClick={this.props.toggleLeftDrawer}>
                <img src={menuIcon} alt="" />
              </button>}

            {headerLogo}
          </div>

          {!this.props.isCreatorStudio && 
            <SearchBar 
              performSearch={this.props.performSearch}
            />}

          <div className="Header__right-dock">
            <Link to="/upload"
                  onMouseOver={() => this.setState({hoveringUploadIcon: true})}
                  onMouseOut={() => this.setState({hoveringUploadIcon: false})}>
              <button className="Header__create-video">
                <img src={this.props.isCreatorStudio ? cameraIconLight : cameraIcon} alt="" />
              </button>
            </Link>
            <span className={'info-tooltip' + (this.state.hoveringUploadIcon ? ' show' : '')}>Create a video</span>
            <span onClick={this.props.toggleAccountMenu}>
              <ProfileIcon width={32} />
            </span>
          </div>
        </div>

        {this.props.showAccountMenu && 
          <AccountMenu isCreatorStudio={this.props.isCreatorStudio} />}
      </div>
    );
  }
}

Header.propTypes = {
  isCreatorStudio: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return state.app;
}

// todo: combine header and watch action creators, if necessary
// https://stackoverflow.com/questions/35454633/redux-connect-with-multiples-actions-states
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
