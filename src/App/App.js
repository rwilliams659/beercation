import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm'
import ApiCalls from '../helpers/ApiCalls'

class App extends Component {
  constructor() {
    super()
    this.apiCalls = new ApiCalls();
    this.state = {
      searchResults: [],
      filteredSearchResults: [],
      error: '',
      breweriesToVisit: [],
      breweriesVisited: []
    }
  }

  getSearchResults = (searchTerm) => {
    Promise.all([
      this.apiCalls.fetchSearchResults(searchTerm, 1),
      this.apiCalls.fetchSearchResults(searchTerm, 2)
    ])
      .then(([response1, response2]) => {
        const searchResults = response1.concat(response2)
        this.setState({ searchResults})
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    return (
      <section className="App">
        <Header />
        <SearchForm 
          getSearchResults={this.getSearchResults}
        />
      </section>
    );
  }
  
}

export default App;
