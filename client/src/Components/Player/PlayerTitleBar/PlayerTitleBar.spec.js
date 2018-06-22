import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import PlayerTitleBar from './PlayerTitleBar';

configure({ adapter: new Adapter() });

describe('<PlayerTitleBar />', () => {
  let props;
  let toggleShareView;

  beforeEach(() => {
    props = {
      videoTitle: 'Example Video',
      showShareView: false,
      toggleShareView: sinon.spy()
    };
  });

  it('displays video title prop', () => {
    const wrapper = shallow(<PlayerTitleBar {...props} />);
    expect(wrapper.find('.title-contents').text()).toEqual('Example Video');
  });

  it('calls toggleShareView on share button click', () => {
    const wrapper = shallow(<PlayerTitleBar {...props} />);
    wrapper.find('.control-share').simulate('click');
    expect(props.toggleShareView.calledOnce).toBeTruthy();
  });

  it('changes buttons when share view open', () => {
    const wrapper = mount(<PlayerTitleBar {...props} />);
    expect(wrapper.find('button')).toHaveLength(2);
    wrapper.setProps({showShareView: true});
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('calls toggleShareView on close button click', () => {
    props.showShareView = true;
    const wrapper = shallow(<PlayerTitleBar {...props} />);
    wrapper.find('.control-close').simulate('click');
    expect(props.toggleShareView.calledOnce).toBeTruthy();
  });
});
