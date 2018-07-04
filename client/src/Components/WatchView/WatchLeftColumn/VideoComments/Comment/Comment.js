import React, { Component } from 'react';
import ProfileIcon from '../../../../ProfileIcon/ProfileIcon';
import CreateComment from './../CreateComment/CreateComment';
import like from '../../../../../resources/like.png';
import dislike from '../../../../../resources/dislike.png';
import dropdownArrow from '../../../../../resources/dropdown-arrow-small.png';
import PropTypes from 'prop-types';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentForm: false,
      showReplies: false
    }
  }

  toggleShowReplies() {
    this.setState((prevState) => ({
      showReplies: !prevState.showReplies
    }));
  }

  /**
   * Append user comment rating to rating buttons div classname, if applicable
   */
  computeRatingButtonsClassExtention() {
    if(this.props.userRating) {
      return this.props.userRating === 'LIKE' ? ' liked' : ' disliked';
    } else {
      return '';
    }
  }

  getUserReplyRating(replyId) {
    const replyRating = this.props.replyUserRatings.find(rating => rating.commentId === replyId);
    if(replyRating) {
      return replyRating.liked ? 'LIKE' : 'DISLIKE';
    }

    return undefined;
  }

  render() {
    const { comment } = this.props;

    let viewRepliesButtonText;
    if(this.props.comment.replies) {
      if(!this.state.showReplies) {
        if(this.props.comment.replies.length === 1) {
          viewRepliesButtonText = (
            <span>View reply</span>
          );
        } else {
          viewRepliesButtonText = (
            <span>View all {this.props.comment.replies.length} replies</span>
          );
        }
      } else {
        viewRepliesButtonText = (
          <span>Hide replies</span>
        );
      }
    }

    const commentText = {
      __html: comment.commentText
    }

    return (
      <div className={'Comment' + (this.props.isReply ? ' reply' : '')
                                + (this.state.showReplies ? ' showing-replies' : '')}>
        <ProfileIcon width={this.props.isReply ? 24 : 40} />
  
        <div className="Comment__details">
          <div className="Comment__title">
            <span className={'meta-creator' + (comment.isVideoAuthor ? ' is-video-author' : '')}><a href="#">{comment.author}</a></span>
            <span className="meta-time-since">{comment.dateSince}</span>
          </div>
  
          <p className="Comment__text" dangerouslySetInnerHTML={commentText}></p>
  
          <div className="Comment__buttons">
            <span className={'Comment__buttons--like-dislike' + this.computeRatingButtonsClassExtention()}>
              <button className="like transparent-button" onClick={() => this.props.rateComment(comment.id, true)}>
                <img src={like} alt="" />
              </button>
              {comment.likeCount > 0 && 
                <span className="comment-like-count">{comment.likeCount}</span>}
  
              <button className="dislike transparent-button" onClick={() => this.props.rateComment(comment.id, false)}>
                <img src={dislike} alt="" />
              </button>
            </span>
  
            <button className="Comment__button--reply transparent-button"
                onClick={() => this.setState((prevState) => ({showCommentForm: !prevState.showCommentForm}))}>Reply</button>
          </div>
  
          {this.state.showCommentForm && 
            <CreateComment 
              isReply={true} 
              postComment={this.props.postCommentReply}
              onCancel={() => this.setState({showCommentForm: false})}
            />}

          {this.props.comment.replies && this.props.comment.replies.length > 0 &&
            <div className="Comment__view-replies">
              <button className="transparent-button" onClick={this.toggleShowReplies.bind(this)}>
                {viewRepliesButtonText}
                <img src={dropdownArrow} alt="" />
              </button>
            </div>}

          {this.state.showReplies && 
            <div className="Comment__replies">
              {comment.replies && comment.replies.map(reply => (
                <Comment 
                  key={reply.id}
                  isReply={true}
                  comment={reply} 
                  postCommentReply={this.props.postCommentReply}
                  rateComment={this.props.rateComment}
                  userRating={this.getUserReplyRating(reply.id)}
                />
              ))}
            </div>}
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    dateSince: PropTypes.string.isRequired,
    commentText: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    isVideoAuthor: PropTypes.bool.isRequired,
    replies: PropTypes.array
  }).isRequired,
  isReply: PropTypes.bool,
  postCommentReply: PropTypes.func.isRequired,
  rateComment: PropTypes.func.isRequired,
  userRating: PropTypes.string
}

export default Comment;