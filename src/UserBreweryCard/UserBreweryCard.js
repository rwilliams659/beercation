import React from 'react'
import './UserBreweryCard.css'
import propTypes from 'prop-types' 
import bottleCapIcon from '../images/bottle-cap.png'
import { Link } from 'react-router-dom'

const UserBreweryCard = ({ name, type, id, city, state, view, toggleBreweryToUserList }) => {
  return (
    <section className='BreweryCard'>
      <Link to={`/breweries/${id}`}>
      <article className='card-body'>
        <section className='icons-tags'>
          <img src={bottleCapIcon} alt='bottle cap' />
        </section>
        <section className='card-content'>
          <h3>{name}</h3>
          <p className='type'>Type: {type}</p>
          <p className='type'>{city}, {state}</p>
        </section>
      </article>
      </Link>
      <section className='add-btns'>
        <button className='to-visit-btn rmv-btn' onClick={() => toggleBreweryToUserList(id, 'breweriesToVisit')}>Unmark as {view}</button>
      </section>
    </section>
  )
}

UserBreweryCard.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  city: propTypes.string.isRequired,
  state: propTypes.string.isRequired,
  view: propTypes.string.isRequired,
  toggleBreweryToUserList: propTypes.func.isRequired
}

export default UserBreweryCard