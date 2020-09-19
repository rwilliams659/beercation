import React from 'react'
import './Breweries.css'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import BreweryCard from '../BreweryCard/BreweryCard'
import FilterForm from '../FilterForm/FilterForm'

const Breweries = ({ searchResults, addBreweryToUserList, breweriesToVisit, breweriesVisited, filterSearchResults, filteredSearchResults }) => {
  let results; 
  if (filteredSearchResults.length > 0) {
    results = filteredSearchResults;
  } else {
    results = searchResults
  }
  const sortedSearchResults = results.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)

  const cards = sortedSearchResults.map(brewery => {
    const inBreweriesToVisit = breweriesToVisit.find(item => item.id === brewery.id) || null
    const inBreweriesVisited = breweriesVisited.find(item => item.id === brewery.id) || null

    return (
        <BreweryCard
          name={brewery.name}
          type={brewery.brewery_type}
          id={brewery.id}
          city={brewery.city}
          state={brewery.state}
          addBreweryToUserList={addBreweryToUserList}
          inBreweriesToVisit={inBreweriesToVisit}
          inBreweriesVisited={inBreweriesVisited}
        />
    )
  })

  return (
    <section className='Breweries'>
      {searchResults.length > 0 &&
        <>
          <section className='results-top-text'>
            <FilterForm 
              searchResults={searchResults}
              filterSearchResults={filterSearchResults}
            />
            <h2 className='results-heading'>Search Results</h2>
            <div className='extra-space'></div>
          </section>
          <section className='brewery-cards'>
            {cards}
          </section>
        </>
       }
    </section>
  )
}

Breweries.propTypes = {
  searchResults: propTypes.array.isRequired,
  addBreweryToUserList: propTypes.func.isRequired,
  breweriesToVisit: propTypes.array.isRequired,
  breweriesVisited: propTypes.array.isRequired,
  filterSearchResults: propTypes.func.isRequired,
  filteredSearchResults: propTypes.array.isRequired
}


export default Breweries 