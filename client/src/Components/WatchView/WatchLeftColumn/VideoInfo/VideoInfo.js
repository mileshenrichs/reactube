import React from 'react';
import InteractionDock from './InteractionDock/InteractionDock';

const VideoInfo = () => {
  return (
    <div className="VideoInfo">
      <section className="info-section">
        <h1 className="VideoInfo__video-title">Big Buck Bunny (Season 1, Episode 1)</h1>
        <span className="VideoInfo__view-count">18,901 views</span>

        <InteractionDock />
      </section>
    </div>
  );
}

export default VideoInfo;