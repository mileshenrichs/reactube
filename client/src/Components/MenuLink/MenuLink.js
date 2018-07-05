import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuLink = ({ url, imgSrc, text, notificationCount, children }) => {
  return (
    <div className="MenuLink">
      <Link to={url || '#'} title={text}>
        {imgSrc ? (<img src={imgSrc} alt="" />) 
                : (children)}
        <span className="MenuLink__text">{text}</span>
      </Link>
    </div>
  );
}

MenuLink.propTypes = {
  url: PropTypes.string,
  imgSrc: PropTypes.string,
  text: PropTypes.string.isRequired,
  notificationCount: PropTypes.number
};

export default MenuLink;