import React, { Component } from 'react'
import './FilterForm.css'
import propTypes from 'prop-types'

class FilterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bar: false, 
      brewpub: false, 
      micro: false,
      large: false,
      regional: false,
      other: false 
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.checked
    this.setState( { [name]: value})
  }

  handleFilterClick = (event) => {
    event.preventDefault()
    const stateKeys = Object.keys(this.state);
    const searchTerms = stateKeys.filter(key => {
      if (this.state[key]) {
        return key
      }
    });
    if (searchTerms.length > 0) {
      this.props.filterSearchResults(searchTerms);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchResults !== prevProps.searchResults) {
      this.clearCheckboxes()
    }
  }

  clearCheckboxes = () => {
    this.setState({bar: false, brewpub: false, micro: false, large: false, regional: false, other: false})
  }

  render() {
    return (
      <section className='FilterForm'>
        <div className='filter-and-clear'>
          <p className='filter-text'>Filter by brewery type:</p>
          <button className='clear-filters'>Clear all filters X</button>
        </div>
        <form>
          <section className='row1'>
            <input type='checkbox' id='option1' name='bar' checked={this.state.bar} onChange={this.handleInputChange}/>
            <label htmlFor='option1'>Bar</label>
            <input type='checkbox' id='option2' name='brewpub' checked={this.state.brewpub} onChange={this.handleInputChange}/>
            <label htmlFor='option2'>Brewpub</label>
            <input type='checkbox' id='option3' name='micro' checked={this.state.micro} onChange={this.handleInputChange}/>
            <label htmlFor='option3'>Microbrewery</label>
          </section>
          <section className='row2'>
            <input type='checkbox' id='option4' name='large' checked={this.state.large} onChange={this.handleInputChange}/>
            <label htmlFor='option4'>Large</label>
            <input type='checkbox' id='option5' name='regional' checked={this.state.regional} onChange={this.handleInputChange}/>
            <label htmlFor='option5'>Regional</label>
            <input type='checkbox' id='option6' name='other' checked={this.state.other} onChange={this.handleInputChange}/>
            <label htmlFor='option6'>Other</label>
          </section>
          <button className='filter-btn' onClick={this.handleFilterClick}>Filter search</button>
        </form>
        </section>
    )
  }
}

FilterForm.propTypes = {
  searchResults: propTypes.array.isRequired,
  filterSearchResults: propTypes.func.isRequired
}


export default FilterForm