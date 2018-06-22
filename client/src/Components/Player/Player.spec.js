import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Player from './Player';

// one of the FilePlayer functions requires window.MediaStream to be defined
window.MediaStream = () => null;

configure({ adapter: new Adapter() });

describe('<Player />', () => {
  it('calls playOrPause() on player click', () => {
    const spy = jest.spyOn(Player.prototype, 'playOrPause');
    const wrapper = mount(<Player />);
    expect(spy).not.toHaveBeenCalled();
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('sets timeout on action flash state in playOrPause()', () => {
    jest.useFakeTimers();
    const e = {
      stopPropagation: () => null
    };
    const wrapper = shallow(<Player />);
    wrapper.instance().playOrPause(e);
    expect(wrapper.state('showActionFlash')).toBe(true);
    jest.runAllTimers();
    expect(wrapper.state('showActionFlash')).toBe(false);
  });

  it('displays action flash when action flash state is true', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__action-flash img')).toHaveLength(0);
    wrapper.setState({showActionFlash: true});
    expect(wrapper.find('.Player__action-flash img')).toHaveLength(1);
  });

  it('sets player state correctly in seekTo()', () => {
    const wrapper = shallow(<Player />);
    wrapper.instance().reactPlayer = {
      seekTo: sinon.spy()
    };
    wrapper.setState({videoLength: 200});
    wrapper.instance().seekTo(.5);
    expect(wrapper.instance().reactPlayer.seekTo.calledOnceWith(.5)).toBe(true);
    expect(wrapper.state('percentPlayed')).toEqual(.5);
    expect(wrapper.state('videoPosition')).toEqual(100);
  });

  it('shows controls on hover', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.state('showControls')).toBe(false);
    wrapper.simulate('mouseover');
    expect(wrapper.state('showControls')).toBe(true);
    wrapper.simulate('mouseout');
    expect(wrapper.state('showControls')).toBe(false);
  });

  it('applies show-title class when showTitle state is true', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__container').hasClass('show-title')).toBe(false);
    wrapper.setState({showTitle: true});
    expect(wrapper.find('.Player__container').hasClass('show-title')).toBe(true);
  });

  it('applies show-controls class when showControls state is true', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__container').hasClass('show-controls')).toBe(false);
    wrapper.setState({showControls: true});
    expect(wrapper.find('.Player__container').hasClass('show-controls')).toBe(true);
  });

  it('applies fullscreen class when playerMode state set to FULLSCREEN', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__container').hasClass('fullscreen')).toBe(false);
    wrapper.setState({playerMode: 'FULLSCREEN'});
    expect(wrapper.find('.Player__container').hasClass('fullscreen')).toBe(true);
  });

  it('applies settings-menu class when showSettingsMenu state is true', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__container').hasClass('settings-menu')).toBe(false);
    wrapper.setState({showSettingsMenu: true});
    expect(wrapper.find('.Player__container').hasClass('settings-menu')).toBe(true);
  });

  it('applies share-view class when showShareView state is true', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__container').hasClass('share-view')).toBe(false);
    wrapper.setState({showShareView: true});
    expect(wrapper.find('.Player__container').hasClass('share-view')).toBe(true);
  });

  it('applies hide-cursor class when hideCursor state is true', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find('.Player__container').hasClass('hide-cursor')).toBe(false);
    wrapper.setState({hideCursor: true});
    expect(wrapper.find('.Player__container').hasClass('hide-cursor')).toBe(true);
  });
});
