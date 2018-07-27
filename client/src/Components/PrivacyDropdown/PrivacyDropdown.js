import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dropdownArrow from '../../resources/dropdown-arrow.png';

class PrivacyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
  }

  onOptionSelected(option) {
    this.setState({
      showDropdown: false
    });
    this.props.onSelectOption(option);
  }

  render() {
    const privacyOptions = [
      {
        type: 'PUBLIC',
        optionName: 'Public',
        optionDesc: 'Anyone can search for and view'
      },
      {
        type: 'UNLISTED',
        optionName: 'Unlisted',
        optionDesc: 'Anyone with the link can view'
      },
      {
        type: 'PRIVATE',
        optionName: 'Private',
        optionDesc: 'Only you can view'
      }
    ];
  
    return (
      <div className="PrivacyDropdown">
        <input type="text" readOnly autoComplete="off" className="underlined-text-input" 
            value={this.props.selectedOption.optionName} onClick={() => this.setState({showDropdown: true})} />
        <img className="dropdown-arrow" src={dropdownArrow} alt="" />
  
        {this.state.showDropdown && 
          <div className="PrivacyDropdown__dropdown">
            {privacyOptions.map(option => (
              <div className={'PrivacyDropdown__option' + (this.props.selectedOption.type === option.type ? ' selected' : '')} 
                  key={option.type} onClick={() => this.onOptionSelected(option)}>
                <span className="PrivacyDropdown__option--name">{option.optionName}</span>
                <span className="PrivacyDropdown__option--desc">{option.optionDesc}</span>
              </div>
            ))}
          </div>}
      </div>
    );
  }
}

PrivacyDropdown.propTypes = {
  selectedOption: PropTypes.shape({
    type: PropTypes.string.isRequired,
    optionName: PropTypes.string.isRequired,
    optionDesc: PropTypes.string.isRequired
  }).isRequired,
  onSelectOption: PropTypes.func.isRequired
}

export default PrivacyDropdown;