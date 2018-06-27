import React from 'react';
import LeftDrawer from '../LeftDrawer/LeftDrawer';
import Player from '../Player/Player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/watchActions'
import WatchLeftColumn from './WatchLeftColumn/WatchLeftColumn';
import WatchRightColumn from './WatchRightColumn/WatchRightColumn';

const WatchView = (props) => {
  
  // dispatch delayed hide drawer overlay action when slide drawer out set to true
  if(props.slideDrawerOut) {
    setTimeout(() => {
      props.hideDrawerOverlay();
    }, 250);
  }

  return (
    <div className={'WatchView' 
            + (props.showLeftDrawer ? ' left-drawer-open' : '')
            + (props.slideDrawerOut ? ' slide-drawer-out' : '')}>
      <LeftDrawer closeDrawer={props.toggleLeftDrawer} />

      <div className="WatchView__container">
        <WatchLeftColumn>
          <Player />
        </WatchLeftColumn>

        <WatchRightColumn>
        </WatchRightColumn>

        <div className="clearfix"></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.watch;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchView);