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