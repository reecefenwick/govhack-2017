import React, { Component } from 'react';
import logo from './logo.svg';
import { Typeahead } from 'react-bootstrap-typeahead';
import './App.css';
import EmploymentProjections from './data/EmploymentProjections'

// Typahead stuff
// ==============
// <Typeahead
//   labelKey="industry"
//   options={options}
//   placeholder="Type your industry..."
// />

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
        <div className="container App-container">
          <div className="row App-header-container">
            <div className="col-md-12">
            </div>
          </div>
          <div className="row App-form-container">
            <div className="col-md-6 App-form-industry">
            </div>
            <div className="col-md-6 App-form-location">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
