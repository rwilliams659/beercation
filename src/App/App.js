import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm'
import ApiCalls from '../helpers/apiCalls'
import { Route } from 'react-router-dom'
import Breweries from '../Breweries/Breweries';
import UserSavedBreweries from '../UserSavedBreweries/UserSavedBreweries';

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
    this.clearSearchResults('filteredSearchResults'); 
    Promise.all([
      this.apiCalls.fetchSearchResults(searchTerm, 1),
      this.apiCalls.fetchSearchResults(searchTerm, 2)
    ])
      .then(([response1, response2]) => {
        const searchResults = response1.concat(response2)
        if (searchResults.length === 0) {
          this.setState({ error: `Sorry, we couldn't find any results in ${searchTerm}.` });
          this.clearSearchResults('searchResults'); 
        } else {
          this.setState({ searchResults })
        }
      })
      .catch(error => this.setState({ error }))
  }

  filterSearchResults = (searchTerms) => {
    if (searchTerms.includes('other')) {
      const targetIndex = searchTerms.indexOf('other')
      searchTerms.splice(1, targetIndex)
      searchTerms = searchTerms.concat(['planning', 'proprietor', 'contract'])
    }
    const filteredSearchResults = this.state.searchResults.filter(result => searchTerms.includes(result.brewery_type));
    this.setState({ filteredSearchResults})
  }

  addBreweryToUserList = (id, list) => {
    const brewery = this.state.searchResults.find(brewery => brewery.id === id)
    this.setState({ [list]: [...this.state[list], brewery]})
  }

  clearSearchResults = (listToClear) => {
    this.setState({ [listToClear]: [] })
  }

  render() {
    return (
      <section className="App">
        <Header />
          <Route exact path='/' render={() => 
            <main>
              <SearchForm 
                getSearchResults={this.getSearchResults}
                error={this.state.error}
              />
              <Breweries
                searchResults={this.state.searchResults}
                addBreweryToUserList={this.addBreweryToUserList}
                breweriesToVisit={this.state.breweriesToVisit}
                breweriesVisited={this.state.breweriesVisited}
                filterSearchResults={this.filterSearchResults}
                filteredSearchResults={this.state.filteredSearchResults}
              />
            </main>
          }/>
          <Route exact path='/to-visit' render={() => 
            <main>
              <UserSavedBreweries 
                userBreweries={this.state.breweriesToVisit}
                view='To Visit'
              />
            </main>
        }/>
        <Route exact path='/visited' render={() =>
          <main>
            <UserSavedBreweries
              userBreweries={this.state.breweriesVisited}
              view='Visited'
            />
          </main>
        } />
        </section>
    );
  }
  
}

export default App;
