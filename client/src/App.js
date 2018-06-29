import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WatchView from './Components/WatchView/WatchView';
import Header from './Components/Header/Header';
import './App.css';
import AccountMenu from './Components/Header/AccountMenu/AccountMenu';
import Notification from './Components/Notification/Notification';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccountMenu: false
    };
  }

  toggleAccountMenu() {
    const newMenuState = !this.state.showAccountMenu;
    this.setState((prevState) => ({
      showAccountMenu: !prevState.showAccountMenu
    }));

    if(newMenuState === true) {
      document.addEventListener('mousedown', this.handleClickWhileAccountMenuOpen)
    } else {
      document.removeEventListener('mousedown', this.handleClickWhileAccountMenuOpen)
    }
  }

  /**
   * Click listener, closes account menu if clicked outside
   * @param {MouseEvent} e mousedown event
   */
  handleClickWhileAccountMenuOpen = (e) => {
    const accountMenu = document.querySelector('.AccountMenu');
    const headerProfileIcon = document.querySelector('.Header .ProfileIcon');
    if (accountMenu && !accountMenu.contains(e.target) && !headerProfileIcon.contains(e.target)) {
      this.toggleAccountMenu();
    }
  }

  render() {

    // set 4 second timeout to hide notification if present
    if(this.props.notification.showNotification) {
      setTimeout(() => {
        this.props.dispatch({
          type: 'CLOSE_NOTIFICATION'
        });
      }, 4000);
    }

    return (
      <div className="App">
        <Header toggleAccountMenu={this.toggleAccountMenu.bind(this)} />
        {this.state.showAccountMenu && 
          <AccountMenu />}

        <div className="clearfix"></div>

        <Router>
          <Switch>
            <Route exact path="/" component={WatchView} />
          </Switch>
        </Router>

        <Notification 
          text={this.props.notification.notificationText}
          visible={this.props.notification.showNotification} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(App);
