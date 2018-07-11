import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoThumbnail from '../../../VideoThumbnail/VideoThumbnail';
import menuIcon from '../../../../resources/vertical-dots.png';

class RelatedVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptionsMenu: false,
      hoveringMenuIcon: false
    }
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
      <div className="RelatedVideo">
        <a href="#" style={{display: 'block', overflow: 'hidden'}} title={this.props.video.title}>
          <VideoThumbnail 
            width={168}
            thumbnailSrc={this.props.video.thumbnailSrc} 
            videoLength={this.props.video.videoLength} 
            watchedProgress={this.props.video.watchedProgress}
          />
  
          <div className="RelatedVideo__details">
            <span className="RelatedVideo__title">{this.props.video.title}</span>
  
            <span className="RelatedVideo__creator text-color-secondary">{this.props.video.creator}</span>
            <span className="RelatedVideo__view-count text-color-secondary">{this.props.video.views} views</span>
          </div>
  
          <img className="RelatedVideo__menu-open" src={menuIcon} alt="" ref={node => this.menuIcon = node}
            style={menuIconStyle} 
            onClick={this.toggleOptionsMenu.bind(this)}
            onMouseEnter={() => this.setState({hoveringMenuIcon: true})}
            onMouseLeave={() => this.setState({hoveringMenuIcon: false})} />
        </a>

        {this.state.showOptionsMenu && 
            <ul className="RelatedVideo__menu inline-menu" ref={node => this.optionsMenu = node}>
              <li>Add to Watch Later</li>
              <li>Add to Playlist</li>
            </ul>}
      </div>
    );
  }
}

RelatedVideo.propTypes = {
  video: PropTypes.object.isRequired
}

export default RelatedVideo;