import React, { Component } from 'react';
import LeftDrawer from '../LeftDrawer/LeftDrawer';
import Player from '../Player/Player';

class WatchView extends Component {
  render() {
    return (
      <div className={'WatchView' 
              + (this.props.showLeftDrawer ? ' left-drawer-open' : '')
              + (this.props.slideDrawerOut ? ' slide-drawer-out' : '')}>
        <LeftDrawer closeDrawer={this.props.closeDrawer} />

        <Player />
      </div>
    );
  }
}

export default WatchView;