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

  /**
   * Show/hide left drawer. If hiding, set slideDrawerOut state .25s in advance
   * to trigger drawer slide animation before hiding overlay
   */
  toggleLeftDrawer() {
    const newShowDrawerState = !this.state.showLeftDrawer;
    if(newShowDrawerState === false) {
      this.setState({
        slideDrawerOut: true
      });

      setTimeout(() => {
        this.setState({
          showLeftDrawer: false,
          slideDrawerOut: false
        })
      }, 250);
    } else {
      this.setState((prevState) => ({
        showLeftDrawer: !prevState.showLeftDrawer
      }));
    }

    // prevent body scrolling when drawer open
    document.body.classList.toggle('drawer-open');
  }

  render() {
    return (
      <div className="App">
        <Header 
          handleMenuClick={this.toggleLeftDrawer.bind(this)}
        />

        <Router>
          <Switch>
            <Route exact path="/"
                  render={() => 
                    <WatchView 
                      showLeftDrawer={this.state.showLeftDrawer} 
                      closeDrawer={this.toggleLeftDrawer.bind(this)} 
                      slideDrawerOut={this.state.slideDrawerOut}
                    />
                  } />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
