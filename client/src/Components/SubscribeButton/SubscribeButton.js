import React from 'react';
import PropTypes from 'prop-types';

const SubscribeButton = ({ subscribed, subCount }) => {
  return (
    <button className={'SubscribeButton' + (subscribed ? ' subscribed' : '')}>
      <span className="SubscribeButton__text-subscribe">{'Subscribe' + (subscribed ? 'd' : '')}</span>
      <span className="SubscribeButton__subcount">{subCount}</span>
    </button>
  );
}

SubscribeButton.propTypes = {
  subscribed: PropTypes.bool.isRequired,
  subCount: PropTypes.string.isRequired
}

export default SubscribeButton;