import React, { Component } from 'react';
import ChannelNavLink from './ChannelNavLink/ChannelNavLink';

class ChannelNav extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    // when channel view is scrolled down, shadow under Header should disappear
    document.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if(this.navDOM.getBoundingClientRect().top === 55) {
      if(!document.body.classList.contains('hide-header-shadow')) {
        document.body.classList.add('hide-header-shadow');
      }
    } else {
      document.body.classList.remove('hide-header-shadow');
    }
  }

  // remove scroll listener when unmounted, reset Header shadow class
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
    document.body.classList.remove('hide-header-shadow');
  }

  render() {
    const pages = ['videos', 'playlists', 'about'];

    return (
      <div className="ChannelNav" ref={node => this.navDOM = node}>
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