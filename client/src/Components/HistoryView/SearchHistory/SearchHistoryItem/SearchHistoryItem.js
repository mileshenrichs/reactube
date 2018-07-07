import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import removeIcon from '../../../../resources/remove.png';

class SearchHistoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveringRemoveIcon: false
    };
  }

  render() {
    return (
      <div className="SearchHistoryItem">
          <Link to="/" style={{display: 'block'}}>
            <span className="SearchHistoryItem__query">{this.props.search.searchQuery}</span>
            <span className="SearchHistoryItem__time-since">{this.props.search.timeSince} ago </span>
          </Link>

          <img className="list-item__remove" src={removeIcon} alt="" onClick={() => this.props.removeVideoFromHistory(this.props.video.id)}
              onMouseEnter={() => this.setState({hoveringRemoveIcon: true})}
              onMouseLeave={() => this.setState({hoveringRemoveIcon: false})} />
          <span className={'list-item__remove-tooltip' + (this.state.hoveringRemoveIcon ? ' show' : '')}>Remove from Search history</span>
        </div>
    );
  }
}

export default SearchHistoryItem;