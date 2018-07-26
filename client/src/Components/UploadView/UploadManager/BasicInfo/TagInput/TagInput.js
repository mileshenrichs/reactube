import React, { Component } from 'react';
import * as actions from '../../../../../actions/uploadActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tag from './Tag/Tag';

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
      this.props.addTag(this.state.currentInput.trim());
    }
    this.setState({currentInput: ''});
  }

  removeTag(tagValue) {
    this.props.removeTag(tagValue);
  }

  getPlaceholderText() {
    return this.props.tags.length ? '' : 'Tags (e.g. albert einstein, flying pig, mashup)';
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

  // computeRemainingInputSpace() {
  //   // find the last tag
  //   const tags = document.querySelectorAll('.Tag');
  //   const lastTag = tags[tags.length - 1];
  //   console.log(lastTag.getBoundingClientRect());

  //   const lastTagEnd = lastTag.getBoundingClientRect().right;
  //   const inputBoxEnd = this.surroundingInputBox.getBoundingClientRect().right;
  //   const INPUT_PADDING_PX = 20;

  //   const inputWidth = inputBoxEnd - lastTagEnd - INPUT_PADDING_PX;

  //   return inputWidth;
  // }

  componentWillUnmount() {
    this.input.removeEventListener('keydown', this.handleInputKeyPress);
  }

  render() {
    return (
      <div className="TagInput" ref={node => this.surroundingInputBox = node}>
        {this.props.tags.map(tag => (
          <Tag 
            key={tag}
            value={tag} 
            removeTag={this.removeTag.bind(this)} 
          />
        ))}
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