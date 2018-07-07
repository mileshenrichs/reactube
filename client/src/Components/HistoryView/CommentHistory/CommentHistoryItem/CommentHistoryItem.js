import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import menuIcon from '../../../../resources/vertical-dots.png';

class CommentHistoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptionsMenu: false
    };
  }

  toggleOptionsMenu(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      showOptionsMenu: !prevState.showOptionsMenu
    }));
  }

  /**
   * Click listener, closes account menu if clicked outside
   * @param {MouseEvent} e mousedown event
   */
  handleClickWhileOptionsMenuOpen = (e) => {
    if (this.optionsMenu && !this.optionsMenu.contains(e.target) && !this.menuIcon.contains(e.target)) {
      this.toggleOptionsMenu(e);
    }
  }

  render() {
    const commentText = {
      __html: this.props.comment.commentText
    }

    if(this.state.showOptionsMenu) {
      document.addEventListener('mousedown', this.handleClickWhileOptionsMenuOpen);
    }

    return (
      <div className="CommentHistoryItem list-item">
        <span className="CommentHistoryItem__info">
          <Link className="item-info-link info-action" to="">Commented</Link> on&nbsp;
          <Link className="item-info-link info-video-title" to="/watch">{this.props.comment.videoTitle}</Link>
        </span>

        <p className="CommentHistoryItem__comment-text" dangerouslySetInnerHTML={commentText}></p>

        <span className="CommentHistoryItem__time-since">{this.props.comment.timeSince} ago</span>

        <img className="list-item__menu-open" src={menuIcon} alt="" ref={node => this.menuIcon = node}
              onClick={this.toggleOptionsMenu.bind(this)}
              onMouseEnter={() => this.setState({hoveringMenuIcon: true})}
              onMouseLeave={() => this.setState({hoveringMenuIcon: false})} />

        {this.state.showOptionsMenu && 
              <ul className="list-item__menu inline-menu" ref={node => this.optionsMenu = node}>
                <li className="has-link"><Link to="/">Edit</Link></li>
                <li className="has-link"><Link to="/">Delete</Link></li>
              </ul>}
      </div>
    );
  }
}

CommentHistoryItem.propTypes = {
  comment: PropTypes.object.isRequired
}

export default CommentHistoryItem;