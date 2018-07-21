export default function channelReducer(state = {}, action) {
  switch(action.type) {

    case 'UPDATE_CHANNEL_USERNAME':
      return {
        ...state,
        username: action.username
      }

    case 'CHANGE_VIDEO_SORT_ORDER':
      // todo: implement sort on video list
      return {
        ...state,
        videoSortOrder: action.sortOrder
      }

      case 'CHANGE_PLAYLIST_SORT_ORDER':
      // todo: implement sort on playlists
      return {
        ...state,
        playlistSortOrder: action.sortOrder
      }

    default:
      return state;
  }
}