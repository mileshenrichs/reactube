import React, { Component } from 'react';
import ThumbnailSelect from './ThumbnailSelect/ThumbnailSelect';
import TagInput from './TagInput/TagInput';

class BasicInfo extends Component {
  render() {
    return (
      <div className="BasicInfo">
        <div className="BasicInfo__top" style={{height: 300}}>
          <div className="BasicInfo__top--left-column">
            <input type="text" placeholder="Title" value={this.props.title} 
                    onChange={(e) => this.props.updateTitle(e.target.value)} />
            <textarea placeholder="Description" value={this.props.description}
                      onChange={(e) => this.props.updateDescription(e.target.value)} />
            <TagInput />
          </div>

          <div className="BasicInfo__top--right-column">

          </div>
        </div>

        <ThumbnailSelect />
      </div>
    );
  }
}

export default BasicInfo;