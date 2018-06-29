import React from 'react';

const Notification = ({ text, visible }) => {
  return(
    <div className={'Notification' + (visible ? ' visible' : '')}>
      <p>{text}</p>
    </div>
  );
}

export default Notification;