import React from 'react'
import './Breweries.css'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import BreweryCard from '../BreweryCard/BreweryCard'
import FilterForm from '../FilterForm/FilterForm'

const Breweries = ({ searchResults, addBreweryToUserList, breweriesToVisit, breweriesVisited }) => {
  //once have filteredSearchResults, pass those down as well from App; if those exist (i.e. not an empty array, reassign searchResults to the value of filteredSearchResults)
  const sortedSearchResults = searchResults.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)

  const cards = sortedSearchResults.map(brewery => {
    const inBreweriesToVisit = breweriesToVisit.find(id => id === brewery.id) || null
    const inBreweriesVisited = breweriesVisited.find(id => id === brewery.id) || null

    return (
      <Link to={`/breweries/${brewery.id}`} key={brewery.id}>
        <BreweryCard
          name={brewery.name}
          type={brewery.brewery_type}
          id={brewery.id}
          addBreweryToUserList={addBreweryToUserList}
          inBreweriesToVisit={inBreweriesToVisit}
          inBreweriesVisited={inBreweriesVisited}
        />
      </Link>
    )
  })

  return (
    <section className='Breweries'>
      {searchResults.length > 0 &&
        <>
          <section className='results-top-text'>
            <FilterForm 
              searchResults={searchResults}
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
  breweriesVisited: propTypes.array.isRequired
}


export default Breweries 