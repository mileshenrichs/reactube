import React, { Component } from 'react';
import like from '../../../../../resources/like.png';
import dislike from '../../../../../resources/dislike.png';
import share from '../../../../../resources/share.png';
import addToPlaylist from '../../../../../resources/add-to-playlist.png';
import AddToMenu from './AddToMenu/AddToMenu';

class InteractionDock extends Component {

  // add event listener if AddToMenu is open
  componentWillReceiveProps(nextProps) {
    if(nextProps.showAddToMenu) {
      setTimeout(() => {
        const addToMenu = document.querySelector('.AddToMenu');
        
        document.addEventListener('mousedown', this.handleClickWhenAddToMenuOpen.bind(this));
      }, 1);
    }
  }

  /**
   * Toggles AddToMenu if is open and there is click event outside of it
   * @param {MouseEvent} e click event on page
   */
  handleClickWhenAddToMenuOpen(e) {
    if(this.props.showAddToMenu) {
      const addToMenu = document.querySelector('.AddToMenu');
      const menuToggleButton = document.querySelector('.InteractionDock__button.add-to-playlist-button');
      if(!addToMenu.contains(e.target) && !menuToggleButton.contains(e.target)) {
        this.props.toggleAddToMenu();
      }
    }
  }

  render() {
    return (
      <div className="InteractionDock">
        <div className="InteractionDock__like-dislike--container">
          <div className={'InteractionDock__like-dislike' + 
                          (this.props.userRating === 'LIKE' ? ' user-liked' : '') + 
                          (this.props.userRating === 'DISLIKE' ? ' user-disliked' : '')}>
            <button className="InteractionDock__button like-button" onClick={() => this.props.rateVideo(true)}>
              <img src={like} alt="" />
              <span>85</span>
            </button>
  
            <button className="InteractionDock__button dislike-button" onClick={() => this.props.rateVideo(false)}>
              <img src={dislike} alt="" />
              <span>5</span>
            </button>
          </div>
  
          <span className="like-meter-bg"></span>
          <span className="like-meter-fill"></span>
        </div>
  
        <button className="InteractionDock__button share-button" onClick={this.props.toggleShareModal}>
          <img src={share} alt="" />
          <span>Share</span>
        </button>
  
        <button className="InteractionDock__button add-to-playlist-button" onClick={this.props.toggleAddToMenu}>
          <img src={addToPlaylist} alt="" />
        </button>
  
        {this.props.showAddToMenu && 
          <AddToMenu 
            userPlaylistsContainingVideo={this.props.userPlaylistsContainingVideo}
            addVideoToPlaylist={this.props.addVideoToPlaylist}   
            removeVideoFromPlaylist={this.props.removeVideoFromPlaylist}
            userPlaylists={this.props.userPlaylists}
            createPlaylistAndAddVideo={this.props.createPlaylistAndAddVideo}
          />}
      </div>
    );
  }
}

export default InteractionDock;