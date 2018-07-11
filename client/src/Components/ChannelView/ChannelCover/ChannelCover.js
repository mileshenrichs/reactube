import React from 'react';
import PropTypes from 'prop-types';

const ChannelCover = (props) => {
  return (
    <div className="ChannelCover">
      <img className="ChannelCover__cover-image" src={props.coverImg} alt="" />
    </div>
  );
}

ChannelCover.propTypes = {
  coverImg: PropTypes.string
};

export default ChannelCover;