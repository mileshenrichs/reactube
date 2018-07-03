import React, { Component } from 'react';
import ProfileIcon from '../../../../ProfileIcon/ProfileIcon';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
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
      this.props.postComment(this.state.comment);
    }
  }

  cancelComment() {
    this.setState({
      showButtons: false,
      comment: ''
    });
  }

  render() {
    return (
      <div className="CreateComment">
        <ProfileIcon width={40} />
        <div className="CreateComment__create-form">
          <textarea className="underlined-text-input" ref={node => this.textarea = node} onKeyUp={this.setTextareaHeight.bind(this)} 
              onClick={() => this.setState({showButtons: true})} value={this.state.comment} 
              onChange={(e) => this.setState({comment: e.target.value})} placeholder="Add a public comment..." />

          {this.state.showButtons && 
            <div className="CreateComment__buttons">
              <button className="cancel transparent-button" onClick={this.cancelComment.bind(this)}>Cancel</button>
              <button className="comment transparent-button" disabled={this.state.comment.length === 0} onClick={this.postComment.bind(this)}>
                Comment
              </button>
            </div>}
        </div>
      </div>
    );
  }
}

export default CreateComment;