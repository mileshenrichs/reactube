import React, { Component } from 'react';
import Player from '../Player/Player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/watchActions'
import WatchLeftColumn from './WatchLeftColumn/WatchLeftColumn';
import WatchRightColumn from './WatchRightColumn/WatchRightColumn';
import VideoInfo from './WatchLeftColumn/VideoInfo/VideoInfo';
import VideoComments from './WatchLeftColumn/VideoComments/VideoComments';
import VideoShareModal from './VideoShareModal/VideoShareModal';

class WatchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialShowLeftDrawer: undefined
    };
  }

  componentWillMount() {
    this.setState({initialShowLeftDrawer: this.props.showLeftDrawer});

    if(this.props.showLeftDrawer) {
      this.instantlyHideLeftDrawer();
    }
  }

  instantlyHideLeftDrawer() {
    let appNode;

    setTimeout(() => {
      appNode = document.querySelector('.App');
      appNode.classList.remove('left-drawer-open');
    }, 1);

    setTimeout(() => {
      this.props.setLeftDrawerWithoutAnimation(false);
    }, 1000);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    // reset left drawer to whatever it was before visiting the /watch page
    this.props.setLeftDrawerWithoutAnimation(this.state.initialShowLeftDrawer);
  }

  render() {
    return (
      <div className="WatchView">
        <div className="WatchView__container">
          <WatchLeftColumn>
            <Player />
            <VideoInfo />
            <VideoComments />
          </WatchLeftColumn>
  
          <WatchRightColumn>
          </WatchRightColumn>
          <div className="clearfix"></div>
  
          {this.props.showVideoShareModal && 
            <VideoShareModal 
              copiedToClipboard={this.props.copiedShareLinkToClipboard}
              toggleShareModal={this.props.toggleShareModal} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { showLeftDrawer } = state.app;
  return {...state.watch, showLeftDrawer};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchView);