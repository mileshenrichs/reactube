import React from 'react';

const PlayerSettingsMenu = (props) => {
  const playbackValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const playbackValueStrings = ['0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '1.75', '2'];
  let currentIndex;

  let options = playbackValueStrings.map(optionStr => {
    currentIndex = playbackValueStrings.indexOf(optionStr);

    if(props.speed === playbackValues[currentIndex]) {
      return (
        <li key={optionStr} className="selected">{optionStr}</li>
      )
    } else {
      return (
        <li key={optionStr}>{optionStr}</li>
      )
    }
  });

  return (
    <div className="PlayerSettingsMenu">
      <span className="PlayerSettingsMenu__title">Speed</span>
      <ul className="PlayerSettingsMenu__options">
        {options}
      </ul>
    </div>
  );
}

export default PlayerSettingsMenu;
