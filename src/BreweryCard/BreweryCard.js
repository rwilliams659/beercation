import React from 'react'
import './BreweryCard.css'
import propTypes from 'prop-types'
import bottleCapIcon from '../images/bottle-cap.png'
import { Link } from 'react-router-dom'


const BreweryCard = ({ name, type, city, state, toggleBreweryToUserList, inBreweriesToVisit, inBreweriesVisited }) => {
  const formattedName = name.replace(/\s/g, '_')
  return (
    <section className='BreweryCard'>
      <Link to={`/breweries/${formattedName}`}>
        <article className='card-body'>
        <section className='icons-tags'>
          <img src={bottleCapIcon} alt='bottle cap'/>
          <div>
            { inBreweriesToVisit? <p className='tag1'>To Visit</p> : '' }
            { inBreweriesVisited ? <p className='tag2'>Visited</p> : '' }
          </div>
        </section>
        <section className='card-content'>
          <h3>{name}</h3>
          <p className='type'>Type: {type}</p>
          <p className='type'>{city}, {state}</p>
        </section>
      </article>
      </Link>
      <section className='add-btns'>
        {inBreweriesToVisit ? 
        <button className='to-visit-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesToVisit')}>Unmark as To Visit</button> : 
        <button className='to-visit-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesToVisit')}>Mark as To Visit</button>
        }
        {inBreweriesVisited ?   
        <button className='visited-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesVisited')}>Unmark as Visited</button> :
        <button className='visited-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesVisited')}>Mark as Visited</button> 
        }
      </section>
    </section>
  )
}

BreweryCard.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  city: propTypes.string.isRequired,
  state: propTypes.string.isRequired,
  toggleBreweryToUserList: propTypes.func.isRequired,
  inBreweriesToVisit: propTypes.object,
  inBreweriesVisited: propTypes.object
}

export default BreweryCard