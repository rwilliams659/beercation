import React, { Component } from 'react'
import './FilterForm.css'
import propTypes from 'prop-types'

class FilterForm extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <section className='FilterForm'>
        <p className='filter-text'>Filter by brewery type:</p>
        <form>
          <section className='row1'>
            <input type='checkbox' id='option1' value='Bar'/>
            <label htmlFor='option1'>Bar</label>
            <input type='checkbox' id='option2' value='Brewpub'/>
            <label htmlFor='option2'>Brewpub</label>
            <input type='checkbox' id='option3' value='Micro'/>
            <label htmlFor='option3'>Microbrewery</label>
          </section>
          <section className='row2'>
            <input type='checkbox' id='option4' value='Large'/>
            <label htmlFor='option4'>Large</label>
            <input type='checkbox' id='option5' value='Regional'/>
            <label htmlFor='option5'>Regional</label>
            <input type='checkbox' id='option6' value='Other'/>
            <label htmlFor='option6'>Other</label>
          </section>
        </form>
        </section>
    )
  }
}

FilterForm.propTypes = {

}


export default FilterForm


// bar, brewpub, micro, large, regional, other (planning, contract, proprietor)