import React, { Component } from 'react';
import StudioSidebar from './StudioSidebar/StudioSidebar';

class CreatorStudioView extends Component {
  render() {
    return (
      <div className="CreatorStudioView">
        <StudioSidebar />
        <div className="CreatorStudioView__main-content">
          CreatorStudioView__main-content
        </div>
      </div>
    );
  }
}

export default CreatorStudioView;