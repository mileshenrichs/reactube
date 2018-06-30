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
  return (dispatch) => {
    dispatch({
      type: 'ADD_VIDEO_TO_PLAYLIST',
      videoId,
      playlistId
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
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_VIDEO_FROM_PLAYLIST',
      videoId,
      playlistId
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