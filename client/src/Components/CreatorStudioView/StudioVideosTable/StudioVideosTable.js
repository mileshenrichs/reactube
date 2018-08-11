import React, { Component } from 'react';
import StudioVideosTableRow from './StudioVideosTableRow/StudioVideosTableRow';

class StudioVideosTable extends Component {
  componentDidMount() {
    document.title = 'Channel Videos - Reactube';
  }

  render() {
    return (
      <div className="StudioVideosTable">
        <table className="StudioVideosTable__table">
          <thead>
            <tr className="tr--header">
              <th>Video</th>
              <th>Visibility</th>
              <th className="th--sortable">Date</th>
              <th className="th--sortable">Views</th>
              <th>Comments</th>
              <th>Likes (vs. dislikes)</th>
            </tr>
          </thead>
          <tbody>
            <StudioVideosTableRow />
            <StudioVideosTableRow />
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudioVideosTable;