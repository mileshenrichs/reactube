import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import StudioSidebar from './StudioSidebar/StudioSidebar';
import StudioVideosTable from './StudioVideosTable/StudioVideosTable';
import StudioPlaylists from './StudioPlaylists/StudioPlaylists';

class CreatorStudioView extends Component {
  render() {
    return (
      <div className="CreatorStudioView">
        <StudioSidebar matchUrl={this.props.match.url} />
        <div className="CreatorStudioView__main-content">
          <Switch>
            <Route exact path={this.props.match.path + '/videos'} render={() => (
              <StudioVideosTable />
            )} />
            <Route exact path={this.props.match.path + '/playlists'} render={() => (
              <StudioPlaylists />
            )} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default CreatorStudioView;