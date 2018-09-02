import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';
import firstVideoThumb from '../../../resources/example-thumb-5.jpg';
import playIcon from '../../../resources/player-buttons/play.png';
import editIcon from '../../../resources/studio/edit.png';

class PlaylistSidebar extends Component {
  render() {
    return (
      <div className="PlaylistSidebar">
        <div className="PlaylistSidebar__top-section">
          <Link to="/" style={{display: 'block', marginBottom: 30}}>
            <div className="PlaylistSidebar__play-now-image">
              <img src={firstVideoThumb} alt="" />
              <div className="PlaylistSidebar__play-now-image--overlay">
                <img src={playIcon} alt="" />
                Play all
              </div>
            </div>
          </Link>

          <Link to="/watch">
            <h2 className="PlaylistSidebar__playlist-name">Happy Playlist</h2>
          </Link>
          <div className="PlaylistSidebar__playlist-details text-color-secondary">
            <span>8 videos</span>
            <span style={{fontSize: 30, margin: '0 4px', position: 'relative', top: 4}}>·</span>
            <span>Updated 5 days ago</span>
          </div>
          <span className="PlaylistSidebar__private-badge text-color-secondary">Private</span>
        </div>

        <div className="PlaylistSidebar__bottom-section">
          <Link to="/" className="PlaylistSidebar__playlist-creator">
            <ProfileIcon width={48} />
            <span className="PlaylistSidebar__playlist-creator--name">Snooz.</span>
          </Link>

          <button className="PlaylistSidebar__edit-button transparent-button">
            <img src={editIcon} alt="" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    )
  }
}

export default PlaylistSidebar;