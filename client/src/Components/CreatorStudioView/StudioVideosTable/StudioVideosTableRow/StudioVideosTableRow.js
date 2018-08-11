import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoThumbnail from '../../../VideoThumbnail/VideoThumbnail';
import thumbSrc from '../../../../resources/example-thumb-17.jpg';
import visibilityPublic from '../../../../resources/visibility-public.png';
import visibilityHidden from '../../../../resources/visibility-hidden.png';

class StudioVideosTableRow extends Component {
  render() {
    return (
      <tr className="StudioVideosTableRow">
        <td>
          <div className="table-row__video">
            <VideoThumbnail width={120} thumbnailSrc={thumbSrc} videoLength="3:58" />
            <div className="table-row__video--details">
              <Link to="/">
                <h4>Photoshop CS5 Signature Speedart #3</h4>
              </Link>
              <span>Third signature speedart, fourth photoshop speedart. Signature designed for Pulse Guardian. Enjoy!</span>
            </div>
          </div>
        </td>
        <td>
          <div className="table-row__visibility">
            <img src={visibilityPublic} alt="" />
            <span>Public</span>
          </div>
        </td>
        <td>
          <div className="table-row__date">
            <span>Nov 4, 2012</span>
          </div>
        </td>
        <td>
          <div className="table-row__views">
            <span>98</span>
          </div>
        </td>
        <td>
          <div className="table-row__comments">
            <Link to="/">1</Link>
          </div>
        </td>
        <td>
          <div className="table-row__likes">
            <span className="table-row__likes--percentage">66.7%</span>
            <span className="table-row__likes--bar-container">
              <span className="table-row__likes--bar-value"></span>
            </span>
          </div>
        </td>
      </tr>
    );
  }
}

export default StudioVideosTableRow;