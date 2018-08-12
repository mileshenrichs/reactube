import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/studioActions';
import { bindActionCreators } from 'redux';
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
            {this.props.userVideos.map(video => (
              <StudioVideosTableRow key={video.id} {...video} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.studio;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioVideosTable);