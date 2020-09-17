import React from 'react'
import './Breweries.test'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import BreweryCard from '../BreweryCard/BreweryCard'

const Breweries = ({searchResults}) => {
  //once have filteredSearchResults, pass those down as well from App; if those exist (i.e. not an empty array, reassign searchResults to the value of filteredSearchResults)
  const cards = searchResults.map(brewery => {
      return (
        <Link to={`/breweries/${brewery.id}`} key={brewery.id}>
          <BreweryCard
            name={brewery.name}
          />
        </Link>
      )
  })

  return (
    <section className='Breweries'>
      {cards}
    </section>
  )
}

Breweries.propTypes = {
  searchResults: propTypes.array
}


export default Breweries 