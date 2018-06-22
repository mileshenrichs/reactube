import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import PlayerControlsBar from './PlayerControlsBar';

configure({ adapter: new Adapter() });

describe('<PlayerControlsBar />', () => {
  let props;

  beforeEach(() => {
    props = {
      playing: true,
      muted: false,
      volume: 1,
      videoPosition: 0,
      videoLength: 60,
      playerMode: 'DEFAULT',
      showSettingsMenu: false,
      playbackSpeed: 1,
      togglePlay: sinon.spy(),
      toggleMute: sinon.spy(),
      changeVolume: sinon.spy(),
      toggleSettings: sinon.spy(),
      toggleFullscreen: sinon.spy(),
      setPlaybackRate: sinon.spy()
    };
  });

  it('toggles play/pause button when playing prop changes', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    expect(wrapper.find('.control-play img').prop('src')).toEqual('pause.png');
    wrapper.setProps({playing: false});
    expect(wrapper.find('.control-play img').prop('src')).toEqual('play.png');
  });

  it('calls togglePlay on play button click', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    wrapper.find('.control-play').simulate('click');
    expect(props.togglePlay.calledOnce).toBeTruthy();
  });

  it('calls toggleMute on volume button click', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    wrapper.find('.control-volume').simulate('click');
    expect(props.toggleMute.calledOnce).toBeTruthy();
  });

  it('calls changeVolume when volume input slider changed', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    wrapper.find('input[type="range"]').simulate('change');
    expect(props.changeVolume.calledOnce).toBeTruthy();
  });

  it('displays correct volume button tooltip text depending on mute state', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    expect(wrapper.find('.control-volume .control-tooltip').text()).toEqual('Mute');
    wrapper.setProps({muted: true});
    expect(wrapper.find('.control-volume .control-tooltip').text()).toEqual('Unmute');
  });

  it('calls toggleSettings on settings button click', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    wrapper.find('.control-settings').simulate('click');
    expect(props.toggleSettings.calledOnce).toBeTruthy();
  });

  it('toggles expand/revert fullscreen icon depending on fullscreen state', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    expect(wrapper.find('.control-fullscreen img').prop('src')).toEqual('fullscreen.png');
    wrapper.setProps({playerMode: 'FULLSCREEN'});
    expect(wrapper.find('.control-fullscreen img').prop('src')).toEqual('fullscreen-exit.png');
  });

  it('calls toggleFullscreen on fullscreen button click', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    wrapper.find('.control-fullscreen').simulate('click');
    expect(props.toggleFullscreen.calledOnce).toBeTruthy();
  });

  it('only shows settings menu when showSettingsMenu is true', () => {
    const wrapper = shallow(<PlayerControlsBar {...props} />);
    expect(wrapper.find('.PlayerSettingsMenu')).toHaveLength(0);
    wrapper.setProps({showSettingsMenu: true});
    expect(wrapper.find('PlayerSettingsMenu')).toHaveLength(1);
  });
});
