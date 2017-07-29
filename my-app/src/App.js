import React, { Component } from 'react';
import logo from './logo.svg';
import { Typeahead } from 'react-bootstrap-typeahead';
import './App.css';
import EmploymentProjections from './data/EmploymentProjections'

class App extends Component {
  render() {
    console.log(EmploymentProjections);
    const options = [
      'John',
      'Miles',
      'Charles',
      'Herbie',
    ];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Typeahead
          labelKey="name"
          options={options}
          placeholder="Choose a state..."
        />
      </div>
    );
  }
}

export default App;
