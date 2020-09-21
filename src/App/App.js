import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm'
import { fetchSearchResults, fetchBreweryByName } from '../helpers/apiCalls'
import { Route } from 'react-router-dom'
import Breweries from '../Breweries/Breweries';
import UserSavedBreweries from '../UserSavedBreweries/UserSavedBreweries';
import BreweryDetails from '../BreweryDetails/BreweryDetails';

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchResults: [],
      filteredSearchResults: [],
      error: '',
      breweriesToVisit: [],
      breweriesVisited: [],
      filtered: false
    }
  }

  getSearchResults = (searchTerm) => {
    this.setState({ error: ''});
    this.setState({ filtered: false })
    this.clearSearchResults('filteredSearchResults'); 
    Promise.all([
      fetchSearchResults(searchTerm, 1),
      fetchSearchResults(searchTerm, 2)
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
    this.setState({ filteredSearchResults, filtered: true})
  }

  toggleBreweryToUserList = (name, list) => {
    const brewery = this.state[list].find(brewery => brewery.name === name)
    if (brewery) {
      const newStateList = this.state[list]
      const targetIndex = this.state[list].indexOf(brewery);
      newStateList.splice(targetIndex, 1);
      this.setState({ [list]: newStateList }, () => localStorage.setItem([list], JSON.stringify(this.state[list])))
    } else {
      const formattedName = name.replace(/\s/g, '_')
      fetchBreweryByName(formattedName)
        .then(response => {
          const brewery = response[0];
          this.setState({ [list]: [...this.state[list], brewery] }, () => localStorage.setItem([list], JSON.stringify(this.state[list])));
        })
        .catch(error => alert(`Sorry, an error occurred with adding this brewery to your ${list} list.` ))
    }
  }

  clearSearchResults = (listToClear) => {
    this.setState({ [listToClear]: [] })
  }

  resetFilter = () => {
    this.setState({ filterSearchResults: [], filtered: false})
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
                toggleBreweryToUserList={this.toggleBreweryToUserList}
                breweriesToVisit={this.state.breweriesToVisit}
                breweriesVisited={this.state.breweriesVisited}
                filterSearchResults={this.filterSearchResults}
                filteredSearchResults={this.state.filteredSearchResults}
                filtered={this.state.filtered}
                resetFilter={this.resetFilter}
              />
            </main>
          }/>
          <Route exact path='/to-visit/' render={() => 
            <main>
              <UserSavedBreweries 
                userBreweries={this.state.breweriesToVisit}
                view='To Visit'
                toggleBreweryToUserList={this.toggleBreweryToUserList}
              />
            </main>
        }/>
        <Route exact path='/visited/' render={() =>
          <main>
            <UserSavedBreweries
              userBreweries={this.state.breweriesVisited}
              view='Visited'
              toggleBreweryToUserList={this.toggleBreweryToUserList}
            />
          </main>
        }/>
        <Route path='/breweries/:name/' render={({ match }) => 
          <BreweryDetails 
            name={match.params.name}
            toggleBreweryToUserList={this.toggleBreweryToUserList}
            breweriesVisited={this.state.breweriesVisited}
            breweriesToVisit={this.state.breweriesToVisit}
          />
        }/>
      </section>
    );
  }
  
}

export default App;
