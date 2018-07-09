import React from 'react';

const PrivacyDropdown = ({ selectedOption, onSelectOption }) => {
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
      {privacyOptions.map(option => (
        <div className={'PrivacyDropdown__option' + (selectedOption.type === option.type ? ' selected' : '')} 
            key={option.type} onClick={() => onSelectOption(option)}>
          <span className="PrivacyDropdown__option--name">{option.optionName}</span>
          <span className="PrivacyDropdown__option--desc">{option.optionDesc}</span>
        </div>
      ))}
    </div>
  );
}

export default PrivacyDropdown;