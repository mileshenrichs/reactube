import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import PlayerSettingsMenu from './PlayerSettingsMenu';

configure({ adapter: new Adapter() });

describe('<PlayerSettingsMenu />', () => {
  let props;

  beforeEach(() => {
    props = {
      speed: 1,
      setPlaybackRate: sinon.spy()
    };
  });

  it('lists settings options', () => {
    const wrapper = shallow(<PlayerSettingsMenu {...props} />);
    expect(wrapper.find('.PlayerSettingsMenu__options li')).toHaveLength(8);
  });

  it('calls setPlaybackRate on <li> click', () => {
    const wrapper = shallow(<PlayerSettingsMenu {...props} />);
    const halfSpeedListItem = wrapper.find('.PlayerSettingsMenu__options li[value=1]');
    halfSpeedListItem.simulate('click');
    expect(props.setPlaybackRate.calledOnce).toBeTruthy();
  });
});
