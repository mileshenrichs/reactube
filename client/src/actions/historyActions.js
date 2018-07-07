// action definitions for the history page

// remove video from history
export function removeVideoFromHistory(videoId) {
  return {
    type: 'REMOVE_VIDEO_FROM_HISTORY',
    videoId
  }
}