import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import * as actions from './actions/appActions';
import LeftDrawer from './Components/LeftDrawer/LeftDrawer';
import WatchView from './Components/WatchView/WatchView';
import Header from './Components/Header/Header';
import './App.css';
import Notification from './Components/Notification/Notification';
import SubscriptionsView from './Components/SubscriptionsView/SubscriptionsView';
import HistoryView from './Components/HistoryView/HistoryView';
import SearchResultsView from './Components/SearchResultsView/SearchResultsView';
import ChannelView from './Components/ChannelView/ChannelView';
import HomeView from './Components/HomeView/HomeView';
import TrendingView from './Components/TrendingView/TrendingView';
import PlaylistView from './Components/PlaylistView/PlaylistView';
import UploadView from './Components/UploadView/UploadView';
import CreatorStudioView from './Components/CreatorStudioView/CreatorStudioView';

class App extends Component {
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

    const isCreatorStudio = this.props.location.pathname.includes('/studio');

    return (
      <div className={'App' 
      + (this.props.app.showLeftDrawer ? ' left-drawer-open' : '')
      + (this.props.app.slideDrawerOut ? ' slide-drawer-out' : '')}>
        <Header isCreatorStudio={isCreatorStudio} />

        <div className="clearfix"></div>

        {!isCreatorStudio && 
          <LeftDrawer 
            closeDrawer={this.props.toggleLeftDrawer} 
            displayAsModal={window.location.pathname.includes('watch')}
          />}

        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/feed/trending" component={TrendingView} />
          <Route exact path="/feed/subscriptions" component={SubscriptionsView} />
          <Route path="/feed/history" component={HistoryView} />
          <Route exact path="/results" component={SearchResultsView} />
          <Route exact path="/watch" component={WatchView} />
          <Route exact path="/playlist" component={PlaylistView} />
          <Route path="/user/:username" component={ChannelView} />
          <Route exact path="/upload" component={UploadView} />
          <Route path="/studio/channel/:channelId" component={CreatorStudioView} />
        </Switch>

        <Notification 
          text={this.props.notification.notificationText}
          visible={this.props.notification.showNotification} 
        />

        <div className="clearfix"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { app, notification } = state;
  return {app, notification};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
