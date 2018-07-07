import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import RadioInput from '../../RadioInput/RadioInput';
import searchIcon from '../../../resources/header/search.png';
import clearIcon from '../../../resources/remove.png';

class HistoryControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchInputFocused: false
    };
  }

  handleNavigationRadioChecked(nextURL) {
    this.props.history.push('/feed/history' + nextURL);
  }

  render() {
    let clearHistoryButton;
    if(this.props.location.pathname === '/feed/history') {
      clearHistoryButton = (
        <button className="HistoryControls__clear-history transparent-button">Clear all watch history</button>
      );
    } else if(this.props.location.pathname.includes('search_history')) {
      clearHistoryButton = (
        <button className="HistoryControls__clear-history transparent-button">Clear all search history</button>
      );
    }

    return (
      <div className="HistoryControls">
        {this.props.location.pathname === '/feed/history' && 
          <div className={'HistoryControls__search-input-container' + (this.state.searchInputFocused ? ' focused' : '')}>
            <input type="text" value={this.state.searchTerm} placeholder="Search watch history" className="HistoryControls__search underlined-text-input"
              onChange={(e) => this.setState({searchTerm: e.target.value})} onFocus={() => this.setState({searchInputFocused: true})}
              onBlur={() => this.setState({searchInputFocused: false})} />
            <img className="HistoryControls__search--search-icon" src={searchIcon} alt="" />
            <img className="HistoryControls__search--clear-icon" src={clearIcon} alt="" />
          </div>}

        <div className="HistoryControls__type-filter">
          <section>History type</section>

          <section>
            <RadioInput text="Watch history" checked={this.props.location.pathname === '/feed/history'} 
                onRadioChecked={() => this.handleNavigationRadioChecked('')} />
          </section>
          <section>
            <RadioInput text="Search history" checked={this.props.location.pathname.includes('search_history')} 
                onRadioChecked={() => this.handleNavigationRadioChecked('/search_history')} />
          </section>
          <section>
            <RadioInput text="Comments" checked={this.props.location.pathname.includes('comment_history')} 
                onRadioChecked={() => this.handleNavigationRadioChecked('/comment_history')} />
          </section>
        </div>

        {clearHistoryButton}
      </div>
    );
  }
}

export default withRouter(HistoryControls);