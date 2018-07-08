import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoThumbnail from '../../VideoThumbnail/VideoThumbnail';
import ListItemTitle from '../../ListItemTitle/ListItemTitle';
import menuIcon from '../../../resources/vertical-dots.png';
import removeIcon from '../../../resources/remove.png';

class VideoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptionsMenu: false,
      hoveringMenuIcon: false,
      hoveringRemoveIcon: false
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

    // set styles according to showBorder prop
    let listItemStyle = {};
    if(this.props.showBorder) {
      listItemStyle = {
        padding: '20px 0',
        borderBottom: '1px solid #eeeeee'
      }
    }

    let itemInteractionButton; // either menu icon or remove icon
    if(this.props.includeRemoveButton) {
      itemInteractionButton = (
        <span>
          <img className="list-item__remove" src={removeIcon} alt="" onClick={() => this.props.removeVideoFromHistory(this.props.video.id)}
              onMouseEnter={() => this.setState({hoveringRemoveIcon: true})}
              onMouseLeave={() => this.setState({hoveringRemoveIcon: false})} />
          <span className={'list-item__remove-tooltip' + (this.state.hoveringRemoveIcon ? ' show' : '')}>Remove from Watch history</span>
        </span>
      );
    } else {
      itemInteractionButton = (
        <img className="list-item__menu-open" src={menuIcon} alt="" ref={node => this.menuIcon = node}
              style={menuIconStyle}
              onClick={this.toggleOptionsMenu.bind(this)}
              onMouseEnter={() => this.setState({hoveringMenuIcon: true})}
              onMouseLeave={() => this.setState({hoveringMenuIcon: false})} />
      );
    }

    return (
      <div className="VideoListItem list-item" style={listItemStyle}>
  
      {this.props.showTitle && 
        <ListItemTitle
          titleImageSrc={this.props.video.creator.profilePicSrc} 
          text={this.props.video.creator.name}  
        />}
  
        <Link className="VideoListItem__thumbnail-link" to="/watch">
          <VideoThumbnail
            width={246}
            thumbnailSrc={this.props.video.thumbnailSrc}
            videoLength={this.props.video.videoLength}
            watchedProgress={this.props.video.watchedProgress}
          />
        </Link>
  
        <div className="VideoListItem__details">
          {itemInteractionButton}

            {this.state.showOptionsMenu && 
              <ul className="list-item__menu inline-menu" ref={node => this.optionsMenu = node}>
                <li>Add to Watch Later</li>
                <li>Add to Playlist</li>
                {window.location.href.includes('feed/subscriptions') && 
                  <li>Hide</li>}
              </ul>}

          <Link to="/watch" style={{display: 'block', height: 138}}>
            <h2 className="VideoListItem__details--title" title={this.props.video.title}>{this.props.video.title}</h2>
            <div className="VideoListItem__subtitle">
              <span className="subtitle-item creator-name">{this.props.video.creator.name}</span>
              <span className="subtitle-item view-count">{this.props.video.views} views</span>
              {this.props.showTimeSince && <span className="subtitle-item time-since">{this.props.video.timeSince} ago</span>}
            </div>
            <p className="VideoListItem__description">{this.props.video.description}</p>
          </Link>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showBorder: PropTypes.bool.isRequired,
  showTimeSince: PropTypes.bool.isRequired,
  includeRemoveButton: PropTypes.bool,
  removeVideoFromHistory: PropTypes.func
};

export default VideoListItem;