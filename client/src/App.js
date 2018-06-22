import React, { Component } from 'react';
import Header from './Components/Header/Header';
import Player from './Components/Player/Player';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Player />
      </div>
    );
  }
}

export default App;
