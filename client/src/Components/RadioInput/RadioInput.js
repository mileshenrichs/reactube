import React from 'react';
import PropTypes from 'prop-types';
import radioUnchecked from '../../resources/radio-unchecked.png';
import radioChecked from '../../resources/radio-checked.png';

const RadioInput = ({ text, checked, onRadioChecked, alignRight }) => {
  return (
    <div className={'RadioInput' + (alignRight ? ' align-right' : '') + (checked ? ' checked' : '')} onClick={onRadioChecked}>
      {alignRight && 
        <div>
          <span className="RadioInput__text">{text}</span>
          <img className="RadioInput__radio-button" src={checked ? radioChecked : radioUnchecked} alt="" />
        </div>}

        {!alignRight &&
          <div>
            <img className="RadioInput__radio-button" src={checked ? radioChecked : radioUnchecked} alt="" />
            <span className="RadioInput__text">{text}</span>
          </div>}
    </div>
  );
}

RadioInput.propTypes = {
  text: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onRadioChecked: PropTypes.func.isRequired,
  alignRight: PropTypes.bool
};

export default RadioInput;