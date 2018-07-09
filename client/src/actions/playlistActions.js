export function addVideoToPlaylist(videoId, playlistId) {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_VIDEO_TO_PLAYLIST',
      videoId,
      playlistId,
      userId: getState().user.id
    });

    // make API call to add to playlist
    // if successful, show notification, else need to remove from playlist
    setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        notificationText: `Added to ${playlistId}`
      });
    }, 300);
  }
}

export function removeVideoFromPlaylist(videoId, playlistId) {
  return (dispatch, getState) => {
    dispatch({
      type: 'REMOVE_VIDEO_FROM_PLAYLIST',
      videoId,
      playlistId,
      userId: getState().user.id
    });

    // make API call to add to playlist
    // if successful, show notification, else need to remove from playlist
    setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        notificationText: `Removed from ${playlistId}`
      });
    }, 300);
  }
}

export function createPlaylistAndAddVideo(playlist, videoId) {
  return (dispatch) => {
    // make API call to create playlist
    setTimeout(() => {
      // pretend API call responds with playlist info
      const res = {
        createdPlaylistId: 'PLA632C0E49DA6712'
      };

      playlist.id = res.createdPlaylistId;
      // if successful, dispatch action to reflect new playlist in user store
      dispatch({
        type: 'NEW_PLAYLIST_CREATED',
        playlist
      });

      // then, call action to add video to created playlist
      dispatch(addVideoToPlaylist(videoId, res.createdPlaylistId));

      // then, if that API call is successful, close AddToMenu
      dispatch({
        type: 'CLOSE_ADD_TO_MENU'
      });

      // since closeAddToMenu state prompts watch video to hide add to menu, reset this so it may be called again
      setTimeout(() => {
        dispatch({
          type: 'RESET_CLOSE_ADD_TO_MENU'
        });
      }, 500);
    }, 250);
  }
}