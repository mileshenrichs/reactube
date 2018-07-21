export function updateChannelUsername(username) {
  return {
    type: 'UPDATE_CHANNEL_USERNAME',
    username
  }
}

export function changeVideoSortOrder(sortOrder) {
  return {
    type: 'CHANGE_VIDEO_SORT_ORDER',
    sortOrder
  }
}

export function changePlaylistSortOrder(sortOrder) {
  return {
    type: 'CHANGE_PLAYLIST_SORT_ORDER',
    sortOrder
  }
}