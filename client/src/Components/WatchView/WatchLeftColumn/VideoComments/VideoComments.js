import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../actions/watchActions'
import sortIcon from '../../../../resources/sort.png';
import CreateComment from './CreateComment/CreateComment';

class VideoComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSortMenu: false
    }
  }

  toggleSortMenu() {
    this.setState((prevState) => ({
      showSortMenu: !prevState.showSortMenu
    }));
  }

  handleClickWhileSortMenuOpen(e) {
    if(this.state.showSortMenu) {
      if(!this.sortMenu.contains(e.target) && !this.sortByButton.contains(e.target)) {
        this.setState({
          showSortMenu: false
        });
      }
    }
  }
  
  render() {
    // listen for clicks if sort menu open (to close if clicked outside)
    if(this.state.showSortMenu) {
      document.addEventListener('mousedown', this.handleClickWhileSortMenuOpen.bind(this));
    }

    return (
      <div className="VideoComments">
        <div className="VideoComments__header">
          <span className="VideoComments__comments-count">502 Comments</span>
  
          <span className="VideoComments__sort-control">
            <button className="VideoComments__sort-button transparent-button" 
                onClick={this.toggleSortMenu.bind(this)} ref={node => this.sortByButton = node}>
              <img src={sortIcon} alt="" />
              <span>Sort By</span>
            </button>
            {this.state.showSortMenu && 
              <ul className="VideoComments__sort-menu inline-menu" ref={node => this.sortMenu = node}>
                <li onClick={() => this.props.changeCommentSortOrder(false)}>Top Comments</li>
                <li onClick={() => this.props.changeCommentSortOrder(true)}>Newest First</li>
              </ul>}
          </span>
        </div>

        <CreateComment postComment={this.props.postComment} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const { changeCommentSortOrder, postComment } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changeCommentSortOrder, postComment}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoComments);