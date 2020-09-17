import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm'

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
        <SearchForm />
      </section>
    );
  }
  
}

export default App;
