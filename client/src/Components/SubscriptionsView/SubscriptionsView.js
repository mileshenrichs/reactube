import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SubscriptionsView extends Component {
  render() {
    return (
      <div className="SubscriptionsView page-container">
        SubscriptionsView
        <Link to="/watch">watch</Link>
      </div>
    );
  }
}

export default SubscriptionsView;