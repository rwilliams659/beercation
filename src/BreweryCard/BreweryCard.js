import React from 'react'
import './BreweryCard.css'
import propTypes from 'prop-types'
import bottleCapIcon from '../images/bottle-cap.png'


const BreweryCard = ({name}) => {
  return (
    <>
    <article className='BreweryCard'>
      <img src={bottleCapIcon} alt='bottle cap'/>
      <h3>{name}</h3>
    </article>
    <section className='add-btns'>
      <button className='to-visit-btn'>Mark as 'To Visit'</button>
      <button className='visited-btn'>Mark as 'Visited'</button>
    </section>
    </>
  )
}

BreweryCard.propTypes = {
  name: propTypes.string.isRequired
}

export default BreweryCard