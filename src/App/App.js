import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm'
import ApiCalls from '../helpers/apiCalls'
import { Route } from 'react-router-dom'

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
    this.setState({ error: ''})
    Promise.all([
      this.apiCalls.fetchSearchResults(searchTerm, 1),
      this.apiCalls.fetchSearchResults(searchTerm, 2)
    ])
      .then(([response1, response2]) => {
        const searchResults = response1.concat(response2)
        if (searchResults.length === 0) {
          this.setState({ error: `Sorry, we couldn't find any results in ${searchTerm}.` })
        } else {
          this.setState({ searchResults })
        }
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    return (
      <section className="App">
        <Header />
          <Route exact to='/' render={() => 
            <main>
              <SearchForm 
                getSearchResults={this.getSearchResults}
                error={this.state.error}
              />
            </main>
          }/>
        </section>
    );
  }
  
}

export default App;
