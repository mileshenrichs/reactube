import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/channelActions';
import ChannelCover from './ChannelCover/ChannelCover';
import ChannelHeaderInfo from './ChannelHeaderInfo/ChannelHeaderInfo';
import ChannelNav from './ChannelNav/ChannelNav';

class ChannelView extends Component {
  componentDidMount() {
    // set page title and background color
    document.title = 'Ninja - Reactube';
    document.body.style.backgroundColor = '#ffffff';

    // pass current channel info to redux store
    this.props.updateChannelUsername(this.props.match.params.username);
  }

  render() {
    return (
      <div className="ChannelView page-container" style={{height: 1000}}>
        <ChannelCover coverImg={this.props.coverImgSrc} />
  
        <div className="ChannelView__header">
          <ChannelHeaderInfo />
        </div>
        <ChannelNav />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.channel;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelView);