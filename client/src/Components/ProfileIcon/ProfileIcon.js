import React from 'react';
import PropTypes from 'prop-types';

const ProfileIcon = ({ width, profilePicSrc }) => {

  // font size for generated icons scale with width... 32px width corresponds to 110% font size
  const FONT_SIZE_PERCENTAGE_RATIO = 110 / 32;

  // display profile pic if provided; else use generated default
  let profilePic;
  if(profilePicSrc) {
    profilePic = (
      <img src={profilePicSrc} alt="" style={{width: width, borderRadius: 50}} />
    );
  } else {
    profilePic = (
      <span className="ProfileIcon__generated" 
        style={{width: width, height: width, background: '#5d4038', fontSize: (width * FONT_SIZE_PERCENTAGE_RATIO) + '%', lineHeight: width + 'px'}}>
        <span className="ProfileIcon__generated--letter">S</span>
      </span>
    );
  }

  return (
    <div className="ProfileIcon">
      {profilePic}
    </div>
  );
}

ProfileIcon.propTypes = {
  width: PropTypes.number.isRequired,
  profilePicSrc: PropTypes.string
};

export default ProfileIcon;