import React from 'react';
import VideoThumbnail from '../../../VideoThumbnail/VideoThumbnail';
import { Link } from 'react-router-dom';
import { toCapitalCase } from '../../../../util/stringUtil';

const PlaylistRow = ({ id, name, privacy, videos }) => {
  const lastVideo = videos[videos.length - 1];
  const playlistPreviewThumb = lastVideo.thumbnailSrc;

  return (
    <div className="PlaylistRow">
      <Link to="/watch" className="PlaylistRow__playlist-link">
        <VideoThumbnail width={130} thumbnailSrc={playlistPreviewThumb} />

        <div className="PlaylistRow__playlist-info">
          <span className="PlaylistRow__playlist-title">{name}</span>

          <span className="PlaylistRow__additional">
            {videos.length} videos <span style={{fontSize: 30, position: 'relative', top: 6}}>·</span> {toCapitalCase(privacy)}
          </span>
        </div>
      </Link>

      <Link to="/" className="PlaylistRow__edit-link">Edit</Link>
    </div>
  );
}

export default PlaylistRow;