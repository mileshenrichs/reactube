import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuLink = ({ url, imgSrc, text, notificationCount, active, showTitle, children }) => {
  return (
    <div className={'MenuLink' + (active ? ' active' : '')}>
      <Link to={url || '#'} title={showTitle ? text : ''}>
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
  notificationCount: PropTypes.number,
  active: PropTypes.bool,
  showTitle: PropTypes.bool
};

export default MenuLink;