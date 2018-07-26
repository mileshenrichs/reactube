import React from 'react';
import PropTypes from 'prop-types';
import removeIcon from '../../../../../../resources/remove.png';

const Tag = ({ value, removeTag }) => {
  return (
    <div className="Tag">
      <span className="Tag__value">{value}</span>
      <button className="Tag__remove icon-button" onClick={() => removeTag(value)}>
        <img src={removeIcon} alt="" />
      </button>  
    </div>
  );
}

Tag.propTypes = {
  value: PropTypes.string.isRequired
}

export default Tag;