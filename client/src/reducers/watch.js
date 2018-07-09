function watchReducer(state = {}, action) {

  switch(action.type) {
    case 'RATE_VIDEO':
      let userRating;
      if(action.liked) {
        userRating = state.userRating === 'LIKE' ? undefined : 'LIKE';
      } else {
        userRating = state.userRating === 'DISLIKE' ? undefined : 'DISLIKE';
      }
      return {
        ...state,
        userRating
      }

    case 'TOGGLE_SHARE_MODAL':
      return {
        ...state,
        showVideoShareModal: !state.showVideoShareModal
      }

    case 'CLOSE_ADD_TO_MENU':
      return {
        ...state,
        closeAddToMenu: true
      }

    case 'RESET_CLOSE_ADD_TO_MENU':
      return {
        ...state,
        closeAddToMenu: false
      }

    case 'TOGGLE_DESCRIPTION_EXPANSION':
      return {
        ...state,
        showExpandedDescription: !state.showExpandedDescription
      }

    case 'CHANGE_COMMENT_SORT_ORDER':
      return {
        ...state,
        sortCommentsByNewest: action.sortByNewest
      }

    case 'COMMENTS_LOADED':
      return {
        ...state,
        videoComments: action.videoComments
      }

    case 'RATE_COMMENT':
      return {
        ...state,
        userCommentRatings: state.userCommentRatings.concat([{
          commentId: action.commentId,
          liked: action.liked
        }])
      }

    case 'MODIFY_COMMENT_RATING':
      return {
        ...state,
        userCommentRatings: [
          ...state.userCommentRatings.slice(0, action.userRatingIndex),
          {
            ...state.userCommentRatings[action.userRatingIndex],
            liked: action.liked
          },
          ...state.userCommentRatings.slice(action.userRatingIndex + 1)
        ]
      }

    case 'REMOVE_COMMENT_RATING':
      return {
        ...state,
        userCommentRatings: [
          ...state.userCommentRatings.slice(0, action.userRatingIndex),
          ...state.userCommentRatings.slice(action.userRatingIndex + 1)
        ]
      }

    default:
      return state;
  }
}

export default watchReducer;