import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ChannelNavLink extends Component {
  render() {
    return (
      <Link className={'ChannelNavLink' + (this.props.isCurrentPage ? ' current' : '')} 
            to={'/user/' + this.props.username + '/' + this.props.page.toLowerCase()}>
        {this.props.page}
      </Link>
    );
  }
}

ChannelNavLink.propTypes = {
  page: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return state.channel;
}

export default connect(mapStateToProps)(ChannelNavLink);