// action definitions for the watch page

// toggle left drawer
export function toggleLeftDrawer() {
  return {
    type: 'TOGGLE_DRAWER'
  }
}

// switch off drawer overlay after animating slide out
export function hideDrawerOverlay() {
  return {
    type: 'HIDE_DRAWER_OVERLAY'
  }
}

// like or dislike video
export function rateVideo(liked) {
  return (dispatch) => {
    dispatch({
      type: 'RATE_VIDEO',
      liked
    })

    // make API call to save video like or dislike
    // todo: replace with API call that responds with new liked status
    // to determine whether to show a liked notification
    setTimeout(() => {
      if(liked) {
        dispatch({
          type: 'SHOW_NOTIFICATION',
          notificationText: 'Added to Liked videos'
        })
      }
    }, 500);
  }
}

export function toggleShareModal() {
  // todo: send current video position in payload
  return {
    type: 'TOGGLE_SHARE_MODAL'
  }
}

export function copiedShareLinkToClipboard() {
  return {
    type: 'SHOW_NOTIFICATION',
    notificationText: 'Link copied to clipboard'
  }
}

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

export function toggleAddToMenu() {
  return {
    type: 'TOGGLE_ADD_TO_MENU'
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
      dispatch(toggleAddToMenu());
    }, 250);
  }
}

export function toggleDescriptionExpansion() {
  return {
    type: 'TOGGLE_DESCRIPTION_EXPANSION'
  }
}

export function changeCommentSortOrder(sortByNewest) {
  return {
    type: 'CHANGE_COMMENT_SORT_ORDER',
    sortByNewest
  }
}

export function postComment(commentText) {
  return {
    type: 'POST_COMMENT',
    commentText
  }
}