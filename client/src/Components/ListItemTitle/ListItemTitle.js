import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { Link } from 'react-router-dom';

const ListItemTitle = ({ titleImageSrc, text }) => {
  return (
    <div className="ListItemTitle">
      <Link to="/" style={{display: 'inline-block', marginBottom: 12}}>
        <ProfileIcon 
          width={32} 
          profilePicSrc={titleImageSrc}
        />
        <span className="ListItemTitle__title">{text}</span>
      </Link>
    </div>
  );
}

export default ListItemTitle;