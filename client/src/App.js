import React, { Component } from 'react';
import WatchView from './Components/WatchView/WatchView';
import Header from './Components/Header/Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeftDrawer: false
    }
  }

  toggleLeftDrawer() {
    this.setState((prevState) => ({
      showLeftDrawer: !prevState.showLeftDrawer
    }));

    // prevent body scrolling when drawer open
    document.body.classList.toggle('drawer-open');
  }

  render() {
    return (
      <div className="App">
        <Header 
          handleMenuClick={this.toggleLeftDrawer.bind(this)}
        />

        <WatchView showLeftDrawer={this.state.showLeftDrawer} closeDrawer={this.toggleLeftDrawer.bind(this)} />
      </div>
    );
  }
}

export default App;
