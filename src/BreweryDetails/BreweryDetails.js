import React from 'react'
import './BreweryDetails.css'
import propTypes from 'prop-types'
import brewery1 from '../images/brewery1.jpg'
import { Link } from 'react-router-dom'

const BreweryDetails = ({matchingBrewery}) => {

  return (
    <section className='BreweryDetails'>
      <section className='img-column'>
        <button><Link to='/'>Back to Results</Link></button>
        <img src={brewery1} alt='brewery'/>
      </section>
      <section className='brewery-info'>
        <h2>{matchingBrewery.name}</h2>
        <p>Address:<br/>{matchingBrewery.street}<br/>{matchingBrewery.city}, {matchingBrewery.state} {matchingBrewery.postal_code}</p>
        <p>Telephone: {matchingBrewery.phone}</p>
        <a href={matchingBrewery.website_url}>Learn more</a>
      </section>
    </section>
  )
}

BreweryDetails.propTypes = {
  matchingBrewery: propTypes.object
}

export default BreweryDetails 