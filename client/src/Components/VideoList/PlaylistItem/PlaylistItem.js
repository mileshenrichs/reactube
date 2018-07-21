import React from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from '../../VideoThumbnail/VideoThumbnail';

const PlaylistItem = ({ playlist }) => {
  return (
    <div className="PlaylistItem list-item">
      <Link className="list-item__thumbnail-link" to="/watch">
          <VideoThumbnail
            width={210}
            thumbnailSrc={playlist.thumbnailSrc}
            playlistVideoCount={playlist.videoCount}
          />
      </Link>

      <Link to="/playlist">
        <h3 className="PlaylistItem__name">{playlist.name}</h3>
      </Link>
    </div>
  );
}

export default PlaylistItem;