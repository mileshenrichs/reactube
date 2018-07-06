import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from '../../VideoThumbnail/VideoThumbnail';
import ListItemTitle from '../../ListItemTitle/ListItemTitle';
import menuIcon from '../../../resources/vertical-dots.png';

class VideoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptionsMenu: false
    };
  }

  toggleOptionsMenu(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      showOptionsMenu: !prevState.showOptionsMenu
    }));
  }

  /**
   * Click listener, closes account menu if clicked outside
   * @param {MouseEvent} e mousedown event
   */
  handleClickWhileOptionsMenuOpen = (e) => {
    if (this.optionsMenu && !this.optionsMenu.contains(e.target) && !this.menuIcon.contains(e.target)) {
      this.toggleOptionsMenu(e);
    }
  }

  render() {
    // keep menu icon visible while menu is open
    let menuIconStyle = {};
    if(this.state.showOptionsMenu) {
      menuIconStyle.opacity = .4;
    }
    if(this.state.hoveringMenuIcon) {
      menuIconStyle.opacity = 1;
    }

    if(this.state.showOptionsMenu) {
      document.addEventListener('mousedown', this.handleClickWhileOptionsMenuOpen);
    }

    return (
      <div className="VideoListItem">
  
      <ListItemTitle
        titleImageSrc={this.props.video.creator.profilePicSrc} 
        text={this.props.video.creator.name}  
      />
  
        <Link className="VideoListItem__thumbnail-link" to="/watch">
          <VideoThumbnail
            width={246}
            thumbnailSrc={this.props.video.thumbnailSrc}
            videoLength={this.props.video.videoLength}
            watchedProgress={this.props.video.watchedProgress}
          />
        </Link>
  
        <Link className="VideoListItem__details" to="/watch" title={this.props.video.title} style={{display: 'block'}}>
          <img className="VideoListItem__menu-open" src={menuIcon} alt="" ref={node => this.menuIcon = node}
              style={menuIconStyle}
              onClick={this.toggleOptionsMenu.bind(this)}
              onMouseEnter={() => this.setState({hoveringMenuIcon: true})}
              onMouseLeave={() => this.setState({hoveringMenuIcon: false})} />

          {this.state.showOptionsMenu && 
            <ul className="VideoListItem__menu inline-menu" ref={node => this.optionsMenu = node}>
              <li>Add to Watch Later</li>
              <li>Add to Playlist</li>
              <li>Hide</li>
            </ul>}

          <h2 className="VideoListItem__details--title">{this.props.video.title}</h2>
          <div className="VideoListItem__subtitle">
            <span className="subtitle-item creator-name">{this.props.video.creator.name}</span>
            <span className="subtitle-item view-count">{this.props.video.views} views</span>
            <span className="subtitle-item time-since">{this.props.video.timeSince} ago</span>
          </div>
          <p className="VideoListItem__description">{this.props.video.description}</p>
        </Link>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default VideoListItem;