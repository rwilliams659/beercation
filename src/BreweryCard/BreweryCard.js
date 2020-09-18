import React from 'react'
import './BreweryCard.css'
import propTypes from 'prop-types'
import bottleCapIcon from '../images/bottle-cap.png'


const BreweryCard = ({name, type}) => {
  return (
    <>
    <article className='BreweryCard'>
      <section className='icons-tags'>
        <img src={bottleCapIcon} alt='bottle cap'/>
        <div>
          <p className='tag1'>To Visit</p>
          <p className='tag2'>Visited</p>
        </div>
      </section>
      <section className='card-content'>
        <h3>{name}</h3>
        <p className='type'>Type: {type}</p>
      </section>
    </article>
    <section className='add-btns'>
      <button className='to-visit-btn'>Mark as 'To Visit'</button>
      <button className='visited-btn'>Mark as 'Visited'</button>
    </section>
    </>
  )
}

BreweryCard.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired
}

export default BreweryCard