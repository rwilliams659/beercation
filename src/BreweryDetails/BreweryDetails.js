import React from 'react'
import './BreweryDetails.css'
import propTypes from 'prop-types'
import brewery1 from '../images/brewery1.jpg'
import { Link } from 'react-router-dom'

const BreweryDetails = ({brewery, toggleBreweryToUserList, breweriesVisited, breweriesToVisit}) => {

  return (
    <section className='BreweryDetails'>
      <section className='img-column'>
        <button><Link to='/'>Back to Results</Link></button>
        <img src={brewery1} alt='brewery'/>
      </section>
      <section className='brewery-info'>
        <h2>{brewery.name}</h2>
        <p>Address:<br/>{brewery.street}<br/>{brewery.city}, {brewery.state} {brewery.postal_code}</p>
        <p>Telephone: {brewery.phone}</p>
        <a href={brewery.website_url}>Learn more</a>
        <section className='user-list-btns'>
          <button>Add to "To Visit"</button>
          <button>Add to "Visited"</button>
        </section>
      </section>
    </section>
  )
}

BreweryDetails.propTypes = {
  brewery: propTypes.object.isRequired,
  toggleBreweryToUserList: propTypes.func.isRequired,
  breweriesVisited: propTypes.array.isRequired,
  breweriesToVisit: propTypes.array.isRequired
}

export default BreweryDetails 