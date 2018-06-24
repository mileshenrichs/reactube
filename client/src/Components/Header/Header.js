import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import logo from '../../resources/logo.png';
import menuIcon from '../../resources/header/hamburger-menu.png';
import cameraIcon from '../../resources/header/create-video.png';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  handleSearchTermChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return (
      <div className="Header">
        <div className="Header__container">
          <div className="Header__left-dock">
            <button className="icon-button Header__menu-icon" onClick={this.props.handleMenuClick}>
              <img src={menuIcon} alt="" />
            </button>

            <a href="#">
              <img className="Header__logo" src={logo} alt="Reactube" />
            </a>
          </div>

          <SearchBar 
            searchTerm={this.state.searchTerm}
            handleSearchTermChange={this.handleSearchTermChange.bind(this)}
          />

          <div className="Header__right-dock">
            <button className="Header__create-video">
              <img src={cameraIcon} alt="" />
            </button>
            <ProfileIcon width={32} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
