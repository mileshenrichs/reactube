import React, { Component } from 'react';
import like from '../../../../../resources/like.png';
import dislike from '../../../../../resources/dislike.png';
import share from '../../../../../resources/share.png';
import addToPlaylist from '../../../../../resources/add-to-playlist.png';
import AddToMenu from '../../../../AddToMenu/AddToMenu';

class InteractionDock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddToMenu: false
    }
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

  /**
   * Toggles AddToMenu if is open and there is click event outside of it
   * @param {MouseEvent} e click event on page
   */
  handleClickWhenAddToMenuOpen(e) {
    if(this.state.showAddToMenu) {
      const menuToggleButton = document.querySelector('.InteractionDock__button.add-to-playlist-button');
      if(!this.addToMenu.contains(e.target) && !menuToggleButton.contains(e.target)) {
        this.toggleAddToMenu();
      }
    }
  }

  toggleAddToMenu() {
    this.setState((prevState) => ({
      showAddToMenu: !prevState.showAddToMenu
    }));
  }

  render() {
    // reset addToMenu instance variable when hidden
    if(!this.state.showAddToMenu) {
      this.addToMenu = undefined;
    }

    // add event listener if AddToMenu is open
    if(this.state.showAddToMenu && !this.addToMenu) {
      setTimeout(() => {
        this.addToMenu = document.querySelector('.AddToMenu');
        document.addEventListener('mousedown', this.handleClickWhenAddToMenuOpen.bind(this));
      }, 100);
    }

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
  
        <button className="InteractionDock__button add-to-playlist-button" onClick={this.toggleAddToMenu.bind(this)}>
          <img src={addToPlaylist} alt="" />
        </button>
  
        {this.state.showAddToMenu && 
          <AddToMenu />}
      </div>
    );
  }
}

export default InteractionDock;