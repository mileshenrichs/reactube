import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../../actions/watchActions'

class CommentsList extends Component {

  getUserCommentRating(commentId) {
    const commentRating = this.props.userCommentRatings.find(rating => rating.commentId === commentId);
    if(commentRating) {
      return commentRating.liked ? 'LIKE' : 'DISLIKE';
    }

    return undefined;
  }

  /**
   * Generates list of user ratings on replies to a given comment.
   * Passed to each comment to help it render its like/dislike buttons
   * @param {Number} commentId id of comment to generate list of replies
   */
  getCommentReplyRatings(commentId) {
    const commentReplies = this.props.comments.find(comment => comment.id === commentId).replies;
    // build list of user ratings corresponding to commentReplies
    let userRatings = [];
    commentReplies.forEach(reply => {
      const userRating = this.props.userCommentRatings.find(rating => rating.commentId === reply.id);
      if(userRating) {
        userRatings.push(userRating);
      }
    });

    return userRatings;
  }

  render() {
    return (
      <div className="CommentsList">
        {this.props.comments.map(comment => (
          <Comment 
            key={comment.id}
            comment={comment}
            postCommentReply={this.props.postCommentReply} 
            rateComment={this.props.rateComment}
            userRating={this.getUserCommentRating(comment.id)}
            replyUserRatings={this.getCommentReplyRatings(comment.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userCommentRatings } = state.watch;
  return {userCommentRatings};
}

const { postCommentReply, rateComment } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({postCommentReply, rateComment}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);