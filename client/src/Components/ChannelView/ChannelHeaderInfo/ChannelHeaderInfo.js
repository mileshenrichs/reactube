import React from 'react';
import profilePic from '../../../resources/example-profpic-5.jpg';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';
import SubscribeButton from '../../SubscribeButton/SubscribeButton';

const ChannelHeaderInfo = () => {
  return (
    <div className="ChannelHeaderInfo">
      <ProfileIcon 
        width={80}
        profilePicSrc={profilePic}
      />

      <div className="ChannelHeaderInfo__name-and-subs">
        <h1 className="ChannelHeaderInfo__name">Ninja</h1>
        <span className="ChannelHeaderInfo__subs-count text-color-secondary">14,925,883 subscribers</span>
      </div>

      <SubscribeButton
        subscribed={false}
        subCount="14M" 
      />
    </div>
  );
}

export default ChannelHeaderInfo;