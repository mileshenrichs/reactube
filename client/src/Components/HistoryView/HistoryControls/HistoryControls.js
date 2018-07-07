import React, { Component } from 'react';
import RadioInput from '../../RadioInput/RadioInput';
import searchIcon from '../../../resources/header/search.png';
import clearIcon from '../../../resources/remove.png';

class HistoryControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchInputFocused: false,
      selectedHistoryType: 'WATCH'
    };
  }

  render() {
    return (
      <div className="HistoryControls">
        <div className={'HistoryControls__search-input-container' + (this.state.searchInputFocused ? ' focused' : '')}>
          <input type="text" value={this.state.searchTerm} placeholder="Search watch history" className="HistoryControls__search underlined-text-input"
            onChange={(e) => this.setState({searchTerm: e.target.value})} onFocus={() => this.setState({searchInputFocused: true})}
            onBlur={() => this.setState({searchInputFocused: false})} />
          <img className="HistoryControls__search--search-icon" src={searchIcon} alt="" />
          <img className="HistoryControls__search--clear-icon" src={clearIcon} alt="" />
        </div>

        <div className="HistoryControls__type-filter">
          <section>History type</section>

          <section>
            <RadioInput text="Watch history" checked={this.state.selectedHistoryType === 'WATCH'} 
                onRadioChecked={() => this.setState({selectedHistoryType: 'WATCH'})} />
          </section>
          <section>
            <RadioInput text="Search history" checked={this.state.selectedHistoryType === 'SEARCH'} 
                onRadioChecked={() => this.setState({selectedHistoryType: 'SEARCH'})} />
          </section>
          <section>
            <RadioInput text="Comments" checked={this.state.selectedHistoryType === 'COMMENT'} 
                onRadioChecked={() => this.setState({selectedHistoryType: 'COMMENT'})} />
          </section>
        </div>

        <button className="HistoryControls__clear-history transparent-button">Clear all watch history</button>
      </div>
    );
  }
}

export default HistoryControls;