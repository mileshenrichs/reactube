import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import * as actions from './actions/appActions';
import LeftDrawer from './Components/LeftDrawer/LeftDrawer';
import WatchView from './Components/WatchView/WatchView';
import Header from './Components/Header/Header';
import './App.css';
import AccountMenu from './Components/Header/AccountMenu/AccountMenu';
import Notification from './Components/Notification/Notification';
import SubscriptionsView from './Components/SubscriptionsView/SubscriptionsView';
import HistoryView from './Components/HistoryView/HistoryView';
import SearchResultsView from './Components/SearchResultsView/SearchResultsView';
import ChannelView from './Components/ChannelView/ChannelView';
import HomeView from './Components/HomeView/HomeView';
import TrendingView from './Components/TrendingView/TrendingView';
import UploadView from './Components/UploadView/UploadView';

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
    // dispatch delayed hide drawer overlay action when slide drawer out set to true
    if(this.props.app.slideDrawerOut) {
      setTimeout(() => {
        this.props.hideDrawerOverlay();
      }, 250);
    }

    // set 4 second timeout to hide notification if present
    if(this.props.notification.showNotification) {
      setTimeout(() => {
        this.props.closeNotification();
      }, 4000);
    }

    return (
      <div className={'App' 
      + (this.props.app.showLeftDrawer ? ' left-drawer-open' : '')
      + (this.props.app.slideDrawerOut ? ' slide-drawer-out' : '')}>
        <Header toggleAccountMenu={this.toggleAccountMenu.bind(this)} />
        {this.state.showAccountMenu && 
          <AccountMenu />}

        <div className="clearfix"></div>

        <LeftDrawer 
          closeDrawer={this.props.toggleLeftDrawer} 
          displayAsModal={window.location.pathname.includes('watch')}
        />

        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/feed/trending" component={TrendingView} />
          <Route exact path="/feed/subscriptions" component={SubscriptionsView} />
          <Route path="/feed/history" component={HistoryView} />
          <Route exact path="/results" component={SearchResultsView} />
          <Route exact path="/watch" component={WatchView} />
          <Route path="/user/:username" component={ChannelView} />
          <Route exact path="/upload" component={UploadView} />
        </Switch>

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
