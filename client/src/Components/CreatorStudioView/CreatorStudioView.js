import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import StudioSidebar from './StudioSidebar/StudioSidebar';
import StudioVideosTable from './StudioVideosTable/StudioVideosTable';

class CreatorStudioView extends Component {
  render() {
    return (
      <div className="CreatorStudioView">
        <StudioSidebar />
        <div className="CreatorStudioView__main-content">
          <Switch>
            <Route exact path={this.props.match.path + '/videos'} render={() => (
              <StudioVideosTable />
            )} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CreatorStudioView;