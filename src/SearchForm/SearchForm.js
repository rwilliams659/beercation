import React, { Component } from 'react';
import './SearchForm.css'
import propTypes from 'prop-types'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }
  }

  handleChange = event => {
    const searchTerm = event.target.value
    this.setState({ searchTerm })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchTerm) {
      this.props.getSearchResults(this.state.searchTerm); 
    }
    this.setState({ searchTerm: ''})
  }

  render() {
    return (
      <section className='SearchForm'>
        <section className='intro-text'>
          <h2>Welcome to Beercation!</h2>
          <p>Thirsting for the best brews in the top US cities? Let us help you plan your next brew-tastic city vacation.</p>
        </section>
        <form className='city-search-form'>
          <label htmlFor='search'> Search the city you plan to visit below to see a list of breweries, bars, and brewpubs in the area.</label>
          <input id='search' type='text' placeholder='Enter a city name' value={this.state.searchTerm} onChange={this.handleChange}/>
          <input type='submit' value='Search' onClick={this.handleSubmit}/>
        </form>
        {this.props.error && 
          <p>{this.props.error}</p>
        }
      </section>
    )
  }
}

SearchForm.propTypes = {
  getSearchResults: propTypes.func.isRequired,
  error: propTypes.string
}

export default SearchForm