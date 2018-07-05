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

export function postCommentReply(replyingToId, commentText) {
  return {
    type: 'POST_COMMENT_REPLY',
    replyingToId,
    commentText
  }
}

export function getVideoComments() {
  return (dispatch, getState) => {
    const videoId = getState().watch.watchingVideoId;
    
    // make API call to get all comments for video
    setTimeout(() => {
      const videoComments = [
        {
          id: 1,
          author: 'Jayvolr',
          dateSince: '1 year ago',
          commentText: 'I feel like I\'m getting a coding lesson from Mark Wahlberg.',
          likeCount: 178,
          isVideoAuthor: false,
          replies: [
            {
              id: 4,
              author: 'Traversy Media',
              dateSince: '1 year ago',
              commentText: 'LOL you are the third person to say that :) Hope you liked the video',
              likeCount: 46,
              isVideoAuthor: true
            },
            {
              id: 5,
              author: 'Jayvolr',
              dateSince: '1 year ago',
              commentText: 'That\'s hilarious, lol. This video was a big help, thank you!',
              likeCount: 4,
              isVideoAuthor: false
            }
          ]
        },
        {
          id: 2,
          author: 'raazs35',
          dateSince: '1 year ago',
          commentText: 'I speed up the video 2X and finished this in about 40 mins. This is so helpful.',
          likeCount: 78,
          isVideoAuthor: false,
          replies: []
        },
        {
          id: 3,
          author: 'Rajni Nair',
          dateSince: '1 year ago',
          commentText: 'Firstly, Thank you so much for sharing your expertise. Must say that it\'s the best crash course on Youtube on Nodejs. You are one of the best tutors out here. Cheers.',
          likeCount: 32,
          isVideoAuthor: false,
          replies: []
        },
        {
          id: 6,
          author: 'Miles Henrichs',
          dateSince: '2 days ago',
          commentText: 'This video is extraordinary.',
          likeCount: 0,
          isVideoAuthor: false,
          replies: []
        }
      ];

      dispatch({
        type: 'COMMENTS_LOADED',
        videoComments
      })
    }, 500);
  }
}

export function rateComment(commentId, liked) {
  return (dispatch, getState) => {
    const commentRating = getState().watch.userCommentRatings.find(rating => rating.commentId === commentId);

    if(commentRating) {
      const userRatingIndex = getState().watch.userCommentRatings.indexOf(commentRating);
      // if rating is the same as existing rating, remove/undo rating altogether
      if(commentRating.liked === liked) {
        dispatch({
          type: 'REMOVE_COMMENT_RATING',
          userRatingIndex
        })
      } else {
        dispatch({
          type: 'MODIFY_COMMENT_RATING',
          userRatingIndex,
          liked
        })
      }
    } else {
      dispatch({
        type: 'RATE_COMMENT',
        commentId,
        liked
      })
    }
  }
}