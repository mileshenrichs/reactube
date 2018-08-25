export function changeVideoVisibility(videoId, newVisibility) {
  return {
    type: 'STUDIO_CHANGE_VIDEO_VISIBILITY',
    videoId,
    newVisibility
  }
}