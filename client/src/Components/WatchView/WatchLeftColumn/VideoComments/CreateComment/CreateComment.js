import React, { Component } from 'react';
import ProfileIcon from '../../../../ProfileIcon/ProfileIcon';
import PropTypes from 'prop-types';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: this.props.isReply ? true : false, // usually hidden, but default to show when is reply
      comment: ''
    }
  }

  /**
   * Called after each key press in comment textarea
   * Calculates and sets height of textarea using offsetHeight property
   */
  setTextareaHeight() {
    this.textarea.style.height = '1px';
    this.textarea.style.height = (6 + this.textarea.scrollHeight) + 'px';
  }

  postComment() {
    if(this.state.comment.length) {
      // pass different params to postComment action depending on whether is reply or original comment
      if(!this.props.isReply) {
        this.props.postComment(this.state.comment);
      } else {
        this.props.postComment('139EEB02F3', this.state.comment);
      }
    }
  }

  cancelComment() {
    this.setState({
      showButtons: false,
      comment: ''
    });

    // call onCancel hook, if passed as prop (used to prompt parent element to hide CreateComment)
    if(this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div className="CreateComment">
        <ProfileIcon width={this.props.isReply ? 24 : 40} />
        <div className="CreateComment__create-form">
          <textarea className="underlined-text-input" ref={node => this.textarea = node} onKeyUp={this.setTextareaHeight.bind(this)} 
              onClick={() => this.setState({showButtons: true})} value={this.state.comment} 
              onChange={(e) => this.setState({comment: e.target.value})} placeholder="Add a public comment..." />

          {this.state.showButtons && 
            <div className="CreateComment__buttons">
              <button className="cancel transparent-button" onClick={this.cancelComment.bind(this)}>Cancel</button>
              <button className="comment transparent-button" disabled={this.state.comment.length === 0} onClick={this.postComment.bind(this)}>
                {this.props.isReply ? 'Reply' : 'Comment'}
              </button>
            </div>}
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  isReply: PropTypes.bool,
  postComment: PropTypes.func.isRequired,
  onCancel: PropTypes.func
};

export default CreateComment;