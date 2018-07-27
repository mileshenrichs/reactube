import React, { Component } from 'react';
import ThumbnailSelect from './ThumbnailSelect/ThumbnailSelect';
import TagInput from './TagInput/TagInput';
import PrivacyDropdown from '../../../PrivacyDropdown/PrivacyDropdown';
import AddToMenu from '../../../AddToMenu/AddToMenu';
import addToPlaylistIcon from '../../../../resources/add-to-playlist.png';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddToMenu: false
    };
  }

  toggleAddToMenu() {
    this.setState(prevState => ({
      showAddToMenu: !prevState.showAddToMenu
    }));
  }

  handleClickWhileAddToMenuOpen = (e) => {
    const addToMenu = document.querySelector('.AddToMenu');
    if(addToMenu) {
      if(!addToMenu.contains(e.target) && !this.addToPlaylistButton.contains(e.target)) {
        this.toggleAddToMenu();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickWhileAddToMenuOpen);
  }

  render() {
    if(this.state.showAddToMenu) {
      document.addEventListener('mousedown', this.handleClickWhileAddToMenuOpen);
    }

    return (
      <div className="BasicInfo">
        <div className="BasicInfo__top">
          <div className="BasicInfo__top--left-column">
            <input type="text" placeholder="Title" value={this.props.title} 
                    onChange={(e) => this.props.updateTitle(e.target.value)} />
            <textarea placeholder="Description" value={this.props.description}
                      onChange={(e) => this.props.updateDescription(e.target.value)} />
            <TagInput />
          </div>

          <div className="BasicInfo__top--right-column">
            <div className="BasicInfo__PrivacyDropdown">
              <PrivacyDropdown 
                selectedOption={this.props.selectedPrivacy}
                onSelectOption={(option) => this.props.onSelectPrivacyOption(option)}
              />
            </div>

            <button className="BasicInfo__add-to-playlist-button transparent-button" ref={node => this.addToPlaylistButton = node}
                    onClick={this.toggleAddToMenu.bind(this)}>
              <img src={addToPlaylistIcon} alt="" />
              <span>Add to playlist</span>
            </button>
            {this.state.showAddToMenu && 
              <AddToMenu 
                videoId={this.props.videoId}
              />}
          </div>
          <div className="clearfix"></div>
        </div>

        <ThumbnailSelect />
      </div>
    );
  }
}

export default BasicInfo;