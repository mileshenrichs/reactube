import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ inputId, checked, changeHandler, labelText, checkboxToLabelDistance }) => {
  const CHECKBOX_IMAGE_PADDING_OFFSET = 19; // width taken up by checkbox
  let labelStyles = {};
  if(checkboxToLabelDistance !== undefined) {
    labelStyles.paddingLeft = checkboxToLabelDistance + CHECKBOX_IMAGE_PADDING_OFFSET;
  }

  return (
    <div className="CheckboxInput">
      <input type="checkbox" id={inputId} checked={checked} onChange={changeHandler} />
      <label htmlFor={inputId} style={labelStyles}>{labelText}</label>
    </div>
  );
}

CheckboxInput.propTypes = {
  inputId: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  changeHandler: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  checkboxToLabelDistance: PropTypes.number
};

export default CheckboxInput;