import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import PlayerProgressBar from './PlayerProgressBar';

configure({ adapter: new Adapter() });

describe('<PlayerProgressBar />', () => {
  let props;

  beforeEach(() => {
    props = {
      percentPlayed: 0.5,
      percentBuffered: 0.75,
      seekTo: sinon.spy()
    };
  });

  it('sets showMousePositionBar state on hover and mouseout', () => {
    const wrapper = shallow(<PlayerProgressBar {...props} />);
    expect(wrapper.state('showMousePositionBar')).toBeFalsy();
    wrapper.simulate('mouseenter');
    expect(wrapper.state('showMousePositionBar')).toBeTruthy();
    wrapper.simulate('mouseleave');
    expect(wrapper.state('showMousePositionBar')).toBeFalsy();
  });

  it('sets progressBarMouseDown state on click and mouseup', () => {
    const wrapper = shallow(<PlayerProgressBar {...props} />);
    expect(wrapper.state('progressBarMouseDown')).toBeFalsy();
    wrapper.simulate('mousedown');
    expect(wrapper.state('progressBarMouseDown')).toBeTruthy();
    wrapper.simulate('mouseup');
    expect(wrapper.state('progressBarMouseDown')).toBeFalsy();
  });

  it('calls handleSeek on click', () => {
    const spy = jest.spyOn(PlayerProgressBar.prototype, 'handleSeek');
    const wrapper = mount(<PlayerProgressBar {...props} />);
    expect(spy).not.toHaveBeenCalled();
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
