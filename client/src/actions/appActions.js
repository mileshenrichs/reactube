// action definitions for the watch page

// toggle left drawer
export function toggleLeftDrawer() {
  return {
    type: 'TOGGLE_DRAWER'
  }
}

// switch off drawer overlay after animating slide out
// used for the modal-like drawer in WatchView
export function hideDrawerOverlay() {
  return {
    type: 'HIDE_DRAWER_OVERLAY'
  }
}

export function closeNotification() {
  return {
    type: 'CLOSE_NOTIFICATION'
  }
}