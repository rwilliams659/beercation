import React from 'react'
import './BreweryCard.css'
import propTypes from 'prop-types'
import bottleCapIcon from '../images/bottle-cap.png'


const BreweryCard = ({ name, type, id, city, state, addBreweryToUserList, inBreweriesToVisit, inBreweriesVisited }) => {
  return (
    <>
    <article className='BreweryCard'>
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
    <section className='add-btns'>
      <button className='to-visit-btn' onClick={() => addBreweryToUserList(id, 'breweriesToVisit')}>Mark as To Visit</button>
        <button className='visited-btn' onClick={() => addBreweryToUserList(id, 'breweriesVisited')}>Mark as Visited</button>
    </section>
    </>
  )
}

BreweryCard.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  city: propTypes.string.isRequired,
  state: propTypes.string.isRequired,
  addBreweryToUserList: propTypes.func.isRequired,
  inBreweriesToVisit: propTypes.object,
  inBreweriesVisited: propTypes.object
}

export default BreweryCard