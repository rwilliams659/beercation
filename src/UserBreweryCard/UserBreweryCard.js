import React from 'react'
import './UserBreweryCard.css'
import propTypes from 'prop-types' 
import bottleCapIcon from '../images/bottle-cap.png'

const UserBreweryCard = ({ name, type, city, state }) => {
  return (
    <article className='BreweryCard'>
      <section className='icons-tags'>
        <img src={bottleCapIcon} alt='bottle cap' />
      </section>
      <section className='card-content'>
        <h3>{name}</h3>
        <p className='type'>Type: {type}</p>
        <p className='type'>{city}, {state}</p>
      </section>
    </article>
  )
}

UserBreweryCard.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  city: propTypes.string.isRequired,
  state: propTypes.string.isRequired
}

export default UserBreweryCard