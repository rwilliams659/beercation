import React from 'react'
import './UserSavedBreweries.css'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import UserBreweryCard from '../UserBreweryCard/UserBreweryCard'

const UserSavedBreweries = ({userBreweries, view}) => {
  const sortedBreweries = userBreweries.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
  const cards = sortedBreweries.map(brewery => 
    <Link to={`/breweries/${brewery.id}`} key={brewery.id}>
      <UserBreweryCard
        name={brewery.name}
        type={brewery.brewery_type}
        id={brewery.id}
        city={brewery.city}
        state={brewery.state}
      />
    </Link>
  )

  return (
    <section className='UserSavedBreweries Breweries'>
      <h2 className='results-heading'>Breweries {view}</h2>
      <section className='brewery-cards'>
        {cards}
      </section>
    </section>
  )
}

UserSavedBreweries.propTypes = {
  userBreweries: propTypes.array.isRequired,
  view: propTypes.string.isRequired
}


export default UserSavedBreweries 