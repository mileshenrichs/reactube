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
    setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        notificationText: 'Added to Liked videos'
      })
    }, 500);
  }
}