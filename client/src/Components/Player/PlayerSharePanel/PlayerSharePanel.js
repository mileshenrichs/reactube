import React from 'react';
import facebook from '../../../resources/player-buttons/share-buttons/facebook.png';
import googlePlus from '../../../resources/player-buttons/share-buttons/google-plus.png';
import twitter from '../../../resources/player-buttons/share-buttons/twitter.png';

const PlayerSharePanel = () => {
  return (
    <div className="PlayerSharePanel">
      <div className="PlayerSharePanel__share">
        <span className="PlayerSharePanel__share--share-text">Share</span>
        <span className="PlayerSharePanel__share--link">
          https://reactu.be/gnsO8-xJ8rs
        </span>
        <span className="PlayerSharePanel__share--buttons">
          <button className="share-button">
            <img src={facebook} alt="Facebook" />
            <span className="control-tooltip">Facebook</span>
          </button>
          <button className="share-button">
            <img src={googlePlus} alt="Google+" />
            <span className="control-tooltip">Google+</span>
          </button>
          <button className="share-button">
            <img src={twitter} alt="Twitter" />
            <span className="control-tooltip">Twitter</span>
          </button>
        </span>
      </div>
    </div>
  );
}

export default PlayerSharePanel;
