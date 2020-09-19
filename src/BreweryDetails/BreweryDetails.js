import React from 'react'
import './BreweryDetails.css'
import propTypes from 'prop-types'
import brewery1 from '../images/brewery1.jpg'
import { Link } from 'react-router-dom'

const BreweryDetails = ({brewery, toggleBreweryToUserList, breweriesVisited, breweriesToVisit}) => {

  const inBreweriesToVisit = breweriesToVisit.find(savedBrewery => savedBrewery.id === brewery.id);

  const inBreweriesVisited = breweriesVisited.find(savedBrewery => savedBrewery.id === brewery.id);

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
          { !inBreweriesToVisit && 
            <button onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesToVisit')}>Mark as to "To Visit"</button>
          }
          { inBreweriesToVisit &&
            <button onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesToVisit')}>Unmark as to "To Visit"</button>
          }
          { !inBreweriesVisited &&
            <button onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesVisited')}>Mark as to "Visited"</button>
          }
          { inBreweriesVisited &&
            <button onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesVisited')}>Unmark as to "Visited"</button>
          }
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