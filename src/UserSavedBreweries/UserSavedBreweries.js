import React from 'react'
import './UserSavedBreweries.css'
import propTypes from 'prop-types'
import UserBreweryCard from '../UserBreweryCard/UserBreweryCard'

const UserSavedBreweries = ({ userBreweries, view, toggleBreweryToUserList }) => {
  const sortedBreweries = userBreweries.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
  const cards = sortedBreweries.map(brewery => 
    <UserBreweryCard
      name={brewery.name}
      type={brewery.brewery_type}
      id={brewery.id}
      city={brewery.city}
      state={brewery.state}
      view={view}
      toggleBreweryToUserList={toggleBreweryToUserList}
    />
  )

  return (
    <section className='UserSavedBreweries Breweries'>
      <h2 className='user-saved-heading'>Breweries {view}</h2>
      {cards.length > 0 && 
        <section className='brewery-cards'>
          {cards}
        </section>
      }
      {cards.length === 0 &&
        <p className='no-cards-yet'>You don't get have any breweries set as "{view}" yet! Return to the homepage to search for new breweries and add them to your lists.</p>
      }
    </section>
  )
}

UserSavedBreweries.propTypes = {
  userBreweries: propTypes.array.isRequired,
  view: propTypes.string.isRequired,
  toggleBreweryToUserList: propTypes.func.isRequired
}


export default UserSavedBreweries 