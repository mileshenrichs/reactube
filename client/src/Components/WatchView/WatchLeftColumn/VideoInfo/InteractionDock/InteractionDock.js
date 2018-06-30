import React from 'react';
import like from '../../../../../resources/like.png';
import dislike from '../../../../../resources/dislike.png';
import share from '../../../../../resources/share.png';
import addToPlaylist from '../../../../../resources/add-to-playlist.png';

const InteractionDock = ({ userRating, rateVideo, toggleShareModal }) => {
  return (
    <div className="InteractionDock">
      <div className="InteractionDock__like-dislike--container">
        <div className={'InteractionDock__like-dislike' + 
                        (userRating === 'LIKE' ? ' user-liked' : '') + 
                        (userRating === 'DISLIKE' ? ' user-disliked' : '')}>
          <button className="InteractionDock__button like-button" onClick={() => rateVideo(true)}>
            <img src={like} alt="" />
            <span>85</span>
          </button>

          <button className="InteractionDock__button dislike-button" onClick={() => rateVideo(false)}>
            <img src={dislike} alt="" />
            <span>5</span>
          </button>
        </div>

        <span className="like-meter-bg"></span>
        <span className="like-meter-fill"></span>
      </div>

      <button className="InteractionDock__button share-button" onClick={toggleShareModal}>
        <img src={share} alt="" />
        <span>Share</span>
      </button>

      <button className="InteractionDock__button add-to-playlist-button">
        <img src={addToPlaylist} alt="" />
      </button>
    </div>
  );
}

export default InteractionDock;