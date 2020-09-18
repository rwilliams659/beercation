import React from 'react'
import './Breweries.css'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import BreweryCard from '../BreweryCard/BreweryCard'

const Breweries = ({ searchResults, addBreweryToUserList }) => {
  //once have filteredSearchResults, pass those down as well from App; if those exist (i.e. not an empty array, reassign searchResults to the value of filteredSearchResults)
  const sortedSearchResults = searchResults.sort((a,b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)

  const cards = sortedSearchResults.map(brewery => {
      return (
        <Link to={`/breweries/${brewery.id}`} key={brewery.id}>
          <BreweryCard
            name={brewery.name}
            type={brewery.brewery_type}
            id={brewery.id}
            addBreweryToUserList={addBreweryToUserList}
          />
        </Link>
      )
  })

  return (
    <section className='Breweries'>
      {searchResults.length > 0 &&
        <>
          <h2 className='results-heading'>Search Results</h2>
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
  addBreweryToUserList: propTypes.func.isRequired
}


export default Breweries 