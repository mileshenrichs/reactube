import React, { Component } from 'react';
import logo from '../resources/logo.png';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img className="Header__logo" src={logo} alt="Reactube" />
      </div>
    );
  }
}

export default Header;
