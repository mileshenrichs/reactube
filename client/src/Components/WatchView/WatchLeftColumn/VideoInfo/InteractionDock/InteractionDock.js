import React from 'react';
import like from '../../../../../resources/like.png';
import dislike from '../../../../../resources/dislike.png';
import share from '../../../../../resources/share.png';
import addToPlaylist from '../../../../../resources/add-to-playlist.png';
import AddToMenu from './AddToMenu/AddToMenu';

const InteractionDock = (props) => {
  return (
    <div className="InteractionDock">
      <div className="InteractionDock__like-dislike--container">
        <div className={'InteractionDock__like-dislike' + 
                        (props.userRating === 'LIKE' ? ' user-liked' : '') + 
                        (props.userRating === 'DISLIKE' ? ' user-disliked' : '')}>
          <button className="InteractionDock__button like-button" onClick={() => props.rateVideo(true)}>
            <img src={like} alt="" />
            <span>85</span>
          </button>

          <button className="InteractionDock__button dislike-button" onClick={() => props.rateVideo(false)}>
            <img src={dislike} alt="" />
            <span>5</span>
          </button>
        </div>

        <span className="like-meter-bg"></span>
        <span className="like-meter-fill"></span>
      </div>

      <button className="InteractionDock__button share-button" onClick={props.toggleShareModal}>
        <img src={share} alt="" />
        <span>Share</span>
      </button>

      <button className="InteractionDock__button add-to-playlist-button">
        <img src={addToPlaylist} alt="" />
      </button>

      <AddToMenu 
        userPlaylistsContainingVideo={props.userPlaylistsContainingVideo}
        addVideoToPlaylist={props.addVideoToPlaylist}   
        removeVideoFromPlaylist={props.removeVideoFromPlaylist}
        userPlaylists={props.userPlaylists}
      />
    </div>
  );
}

export default InteractionDock;