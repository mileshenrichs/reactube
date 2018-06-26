import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WatchView from './Components/WatchView/WatchView';
import Header from './Components/Header/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeftDrawer: false,
      slideDrawerOut: false
    }
  }

  render() {
    return (
      <div className="App">
        <Header />

        <Router>
          <Switch>
            <Route exact path="/" component={WatchView} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
