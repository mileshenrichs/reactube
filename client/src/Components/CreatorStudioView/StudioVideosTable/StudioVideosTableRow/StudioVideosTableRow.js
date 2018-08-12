import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoThumbnail from '../../../VideoThumbnail/VideoThumbnail';
import visibilityPublic from '../../../../resources/visibility-public.png';
import visibilityHidden from '../../../../resources/visibility-hidden.png';
import viewOnReactube from '../../../../resources/studio/view-on-reactube.png';
import menuIcon from '../../../../resources/vertical-dots.png';
import editIcon from '../../../../resources/studio/edit.png';
import shareIcon from '../../../../resources/studio/share.png';
import downloadIcon from '../../../../resources/studio/download.png';
import trashIcon from '../../../../resources/studio/trash.png';

class StudioVideosTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHighlighted: false,
      showOptionsMenu: false
    };
  }

  capitalCaseVisibilityType(privacyType) {
    return privacyType.charAt(0) + privacyType.slice(1).toLowerCase();
  }

  getLikesPercentage() {
    const { likes, dislikes } = this.props;
    return (likes / (likes + dislikes) * 100).toFixed(1);
  }

  handleMouseLeave() {
    if(!this.state.showOptionsMenu) {
      this.setState({isHighlighted: false});
    }
  }

  handleClickWhileOptionsMenuOpen = (e) => {
    if(this.optionsMenu && !this.optionsMenu.contains(e.target)) {
      this.setState({showOptionsMenu: false});
    }
  }

  render() {
    if(this.state.showOptionsMenu) {
      document.addEventListener('mousedown', this.handleClickWhileOptionsMenuOpen);
    }

    return (
      <tr className={'StudioVideosTableRow' + (this.state.isHighlighted ? ' highlighted' : '')} 
          onMouseEnter={() => this.setState({isHighlighted: true})}
          onMouseLeave={this.handleMouseLeave.bind(this)}>
        <td>
          <div className="table-row__video">
            <VideoThumbnail width={120} thumbnailSrc={this.props.thumbnailSrc} videoLength={this.props.videoLength} />
            <div className="table-row__video--details">
              <Link to="/">
                <h4>{this.props.title}</h4>
              </Link>
              <span>{this.props.description}</span>
            </div>

            <div className="table-row__video--controls">
              <button className="icon-button button__view-on-reactube" title="View on Reactube">
                <Link to="/">
                  <img src={viewOnReactube} alt="" />
                </Link>
              </button>
              <button className="icon-button button__toggle-menu" title="Options" onClick={() => this.setState({showOptionsMenu: true})}>
                <img src={menuIcon} alt="" />
              </button>
              {this.state.showOptionsMenu && 
                <ul className="table-row__video--options-menu inline-menu" ref={node => this.optionsMenu = node}>
                  <li>
                    <img src={editIcon} alt="" />
                    <span>Edit title and description</span>
                  </li>
                  <li>
                    <img src={shareIcon} alt="" />
                    <span>Get shareable link</span>
                  </li>
                  <li>
                    <img src={downloadIcon} alt="" />
                    <span>Download</span>
                  </li>
                  <li>
                    <img src={trashIcon} alt="" />
                    <span>Delete</span>
                  </li>
                </ul>}
            </div>
          </div>
        </td>
        <td>
          <div className="table-row__visibility">
            <img src={this.props.visibility === 'PUBLIC' ? visibilityPublic : visibilityHidden} className="visibility-indicator" alt="" />
            <span>{this.capitalCaseVisibilityType(this.props.visibility)}</span>
            <button className="table-row__visibility--edit-button icon-button">
              <img src={editIcon} alt="" />
            </button>
          </div>
        </td>
        <td>
          <div className="table-row__date">
            <span>{this.props.datePublished}</span>
          </div>
        </td>
        <td>
          <div className="table-row__views">
            <span>{this.props.views}</span>
          </div>
        </td>
        <td>
          <div className="table-row__comments">
            <Link to="/">{this.props.comments}</Link>
          </div>
        </td>
        <td>
          <div className="table-row__likes">
            <span className="table-row__likes--percentage">{this.getLikesPercentage()}%</span>
            <span className="table-row__likes--bar-container">
              <span className="table-row__likes--bar-value" style={{width: this.getLikesPercentage() + '%'}}></span>
            </span>
          </div>
        </td>
      </tr>
    );
  }
}

StudioVideosTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnailSrc: PropTypes.string.isRequired,
  videoLength: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired,
  datePublished: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired
};

export default StudioVideosTableRow;