import React from 'react';

const ChannelDescription = ({ description }) => {

  const descriptionText = {
    __html: description
  };

  return (
    <div className="ChannelDescription">
      <h2>Description</h2>
      <p dangerouslySetInnerHTML={descriptionText}></p>
    </div>
  );
}

export default ChannelDescription;