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
        <div>
          {inBreweriesToVisit ? <p className='tag1'>To Visit</p> : ''}
          {inBreweriesVisited ? <p className='tag2'>Visited</p> : ''}
        </div>
      </section>
      <section className='brewery-info'>
        <h2>{brewery.name}</h2>
        <p>Address:<br/>{brewery.street}<br/>{brewery.city}, {brewery.state} {brewery.postal_code}</p>
        <p>Telephone: {brewery.phone}</p>
        <a href={brewery.website_url} target='_blank'>Learn more</a>
        <section className='add-btns'>
          {inBreweriesToVisit ?
            <button className='to-visit-btn' onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesToVisit')}>Unmark as To Visit</button> :
            <button className='to-visit-btn' onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesToVisit')}>Mark as To Visit</button>
          }
          {inBreweriesVisited ?
            <button className='visited-btn' onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesVisited')}>Unmark as Visited</button> :
            <button className='visited-btn' onClick={() => toggleBreweryToUserList(brewery.id, 'breweriesVisited')}>Mark as Visited</button>
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