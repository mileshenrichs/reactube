import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../../actions/appActions'
import { Link } from 'react-router-dom';
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
            <button className="icon-button Header__menu-icon" onClick={this.props.toggleLeftDrawer}>
              <img src={menuIcon} alt="" />
            </button>

            <Link to="/">
              <img className="Header__logo" src={logo} alt="Reactube" />
            </Link>
          </div>

          <SearchBar 
            searchTerm={this.state.searchTerm}
            handleSearchTermChange={this.handleSearchTermChange.bind(this)}
          />

          <div className="Header__right-dock">
            <button className="Header__create-video">
              <img src={cameraIcon} alt="" />
            </button>
            <span onClick={this.props.toggleAccountMenu}>
              <ProfileIcon width={32} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

// todo: combine header and watch action creators, if necessary
// https://stackoverflow.com/questions/35454633/redux-connect-with-multiples-actions-states
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
