import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoThumbnail from '../../VideoThumbnail/VideoThumbnail';
import ListItemTitle from '../../ListItemTitle/ListItemTitle';
import AddToMenu from '../../AddToMenu/AddToMenu';
import menuIcon from '../../../resources/vertical-dots.png';
import removeIcon from '../../../resources/remove.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/playlistActions';

class VideoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptionsMenu: false,
      hoveringMenuIcon: false,
      hoveringRemoveIcon: false,
      showAddToMenu: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // close AddToMenu when prompted by redux store flag (occurs after new playlist has been created)
    if(nextProps.closeAddToMenu && this.state.showAddToMenu) {
      this.setState({
        showAddToMenu: false
      });
      this.addToMenu = undefined;
    }
  }

  toggleOptionsMenu(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      showOptionsMenu: !prevState.showOptionsMenu
    }));
  }

  addToWatchLater() {
    const watchLaterPlaylistId = this.props.userPlaylists.find(playlist => playlist.id.substring(0, 5) === 'PLAWL').id;
    this.props.addVideoToPlaylist(this.props.video.id, watchLaterPlaylistId);
    this.setState({showOptionsMenu: false});
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

  handleClickWhileAddToMenuOpen = (e) => {
    const addToMenu = document.querySelector('.AddToMenu');
    if(addToMenu && !addToMenu.contains(e.target)) {
      this.setState({
        showAddToMenu: false
      });
    }
  }

  // clean up menu click listeners
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickWhileOptionsMenuOpen);
    document.removeEventListener('mousedown', this.handleClickWhileAddToMenuOpen);
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
    if(this.state.showAddToMenu) {
      document.addEventListener('mousedown', this.handleClickWhileAddToMenuOpen);
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
          <span className={'list-item__remove-tooltip info-tooltip' + (this.state.hoveringRemoveIcon ? ' show' : '')}>
            Remove from Watch history
          </span>
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
  
        <div className="list-item__cursor-pointer-container">
          <Link className="list-item__thumbnail-link" to="/watch">
            <VideoThumbnail
              width={this.props.displayAs === 'list' ? 246 : 210}
              thumbnailSrc={this.props.video.thumbnailSrc}
              videoLength={this.props.video.videoLength}
              watchedProgress={this.props.video.watchedProgress}
            />
          </Link>
    
          <div className="VideoListItem__details">
            {itemInteractionButton}

              {this.state.showOptionsMenu && 
                <ul className="list-item__menu inline-menu" ref={node => this.optionsMenu = node}>
                  <li onClick={this.addToWatchLater.bind(this)}>Add to Watch Later</li>
                  <li onClick={() => this.setState({showAddToMenu: true, showOptionsMenu: false})}>Add to Playlist</li>
                  {window.location.href.includes('feed/subscriptions') && 
                    <li>Hide</li>}
                </ul>}

              {this.state.showAddToMenu && 
                <AddToMenu videoId={this.props.video.id} />}

            <Link to="/watch">
              <h2 className="VideoListItem__details--title" title={this.props.video.title}>{this.props.video.title}</h2>
            </Link>
            <div className="VideoListItem__subtitle">
              {(this.props.displayAs === 'list' || this.props.showCreatorInGrid) &&
                <Link to="/user/NinjasHyper" className={'subtitle-item creator-name' + (this.props.showCreatorInGrid ? ' shown-in-grid' : '')}>
                  <span className="creator-name">
                    {this.props.video.creator.name}
                  </span>
                </Link>}
              <span className="subtitle-item view-count">{this.props.video.views} views</span>
              {this.props.showTimeSince && <span className="subtitle-item time-since">{this.props.video.timeSince} ago</span>}
            </div>
            {this.props.displayAs === 'list' && 
              <p className="VideoListItem__description">{this.props.video.description}</p>}
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

VideoListItem.propTypes = {
  video: PropTypes.object.isRequired,
  displayAs: PropTypes.string.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showBorder: PropTypes.bool.isRequired,
  showTimeSince: PropTypes.bool.isRequired,
  includeRemoveButton: PropTypes.bool,
  removeVideoFromHistory: PropTypes.func,
  showCreatorInGrid: PropTypes.bool
};

const mapStateToProps = (state) => {
  const { closeAddToMenu } = state.playlists.addToMenu;
  const { userPlaylists } = state.playlists;
  return {closeAddToMenu, userPlaylists};
}

const { addVideoToPlaylist } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addVideoToPlaylist}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);