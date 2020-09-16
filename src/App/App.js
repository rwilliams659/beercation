import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchResults: [],
      filteredSearchResults: [],
      error: '',
      breweriesToVisit: [],
      breweriesVisited: []
    }

  }

  render() {
    return (
      <section className="App">
        <Header />
      </section>
    );
  }
  
}

export default App;
