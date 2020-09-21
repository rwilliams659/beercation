import React from 'react'
import './PageNotFound.css'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <section className='PageNotFound'>
      <h2>Oops, we couldn't find that page!</h2>
      <p> We suggest you navigate to the <Link to='/'>homepage.</Link></p>
    </section>
  )
}

export default PageNotFound