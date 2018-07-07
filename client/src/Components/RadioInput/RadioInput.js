import React from 'react';
import PropTypes from 'prop-types';
import radioUnchecked from '../../resources/radio-unchecked.png';
import radioChecked from '../../resources/radio-checked.png';

const RadioInput = ({ text, checked, onRadioChecked }) => {
  return (
    <div className="RadioInput" onClick={onRadioChecked}>
      <span className="RadioInput__text">{text}</span>
      <img className="RadioInput__radio-button" src={checked ? radioChecked : radioUnchecked} alt="" />
    </div>
  );
}

RadioInput.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onRadioChecked: PropTypes.func.isRequired
};

export default RadioInput;