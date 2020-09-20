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
            { inBreweriesToVisit? <p className='tag1' aria-label={`${name} marked as "to visit"`}>To Visit</p> : '' }
              {inBreweriesVisited ? <p className='tag2' aria-label={`${name} marked as "visited"`}>Visited</p> : '' }
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
        <button className='to-visit-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesToVisit')} aria-label={`Unmark ${name} as To Visit`}>Unmark as To Visit</button> : 
        <button className='to-visit-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesToVisit')} aria-label={`Mark ${name} as To Visit`}>Mark as To Visit</button>
        }
        {inBreweriesVisited ?   
        <button className='visited-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesVisited')} aria-label={`Unmark ${name} as Visited`}>Unmark as Visited</button> :
        <button className='visited-btn' onClick={() => toggleBreweryToUserList(name, 'breweriesVisited')} aria-label={`Mark ${name} as Visited`}>Mark as Visited</button> 
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