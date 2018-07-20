import React, { Component } from 'react';
import ChannelNavLink from './ChannelNavLink/ChannelNavLink';

class ChannelNav extends Component {
  render() {
    const pages = ['videos', 'playlists', 'about'];

    return (
      <div className="ChannelNav">
        <div className="ChannelNav__container">
          {pages.map(page => (
            <ChannelNavLink 
              key={page} 
              page={page}
              isCurrentPage={this.props.currentPage === page}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ChannelNav;