import React, { Component } from 'react';
import * as actions from '../../../../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: ''
    };
  }

  componentDidMount() {
    this.input.addEventListener('keydown', this.handleInputKeyPress);
  }

  handleInputKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.addCurrentInputAsTag();
    }
  }

  handleInputChange(e) {
    const val = e.target.value;
    if(val.charAt(val.length - 1) === ',') {
      this.addCurrentInputAsTag();
    } else {
      this.setState({currentInput: e.target.value});
    }
  }

  addCurrentInputAsTag() {
    if(this.state.currentInput.length) {
      this.props.addTag(this.state.currentInput);
    }
  }

  getPlaceholderText() {
    return this.props.tags.length ? '' : 'Tags (e.g. albert einstein, flying pig, mashup)'
  }

  computeInputStyle() {
    let inputWidth;
    if(this.props.tags.length === 0) {
      inputWidth = '100%';
    } else {
      inputWidth = (this.state.currentInput.length + 5) + 'ch';
    }

    return {
      width: inputWidth
    }
  }

  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleInputKeyPress);
  }

  render() {
    return (
      <div className="TagInput">
        <input type="text" className="TagInput__input" placeholder={this.getPlaceholderText()} ref={node => this.input = node}
                value={this.state.currentInput} onChange={this.handleInputChange.bind(this)} style={this.computeInputStyle()} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tags } = state.upload;
  return {tags};
}

const { addTag, removeTag } = actions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addTag, removeTag}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagInput);