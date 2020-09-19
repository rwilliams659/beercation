import React, { Component } from 'react'
import './BreweryDetails.css'
import propTypes from 'prop-types'
import brewery1 from '../images/brewery1.jpg'
import { Link } from 'react-router-dom'

class BreweryDetails extends Component {
  componentDidMount() {
    
  }

  render() {
    const inBreweriesToVisit = this.props.breweriesToVisit.find(savedBrewery => savedBrewery.id === this.props.brewery.id);

    const inBreweriesVisited = this.props.breweriesVisited.find(savedBrewery => savedBrewery.id === this.props.brewery.id);

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
          <h2>{this.props.brewery.name}</h2>
          <p>Address:<br />{this.props.brewery.street}<br />{this.props.brewery.city}, {this.props.brewery.state} {this.props.brewery.postal_code}</p>
          <p>Telephone: {this.props.brewery.phone}</p>
          <a href={this.props.brewery.website_url} target='_blank' rel='noopener noreferrer'>Learn more</a>
          <section className='add-btns'>
            {inBreweriesToVisit ?
              <button className='to-visit-btn' onClick={() => this.props.toggleBreweryToUserList(this.props.brewery.id, 'breweriesToVisit')}>Unmark as To Visit</button> :
              <button className='to-visit-btn' onClick={() => this.props.toggleBreweryToUserList(this.props.brewery.id, 'breweriesToVisit')}>Mark as To Visit</button>
            }
            {inBreweriesVisited ?
              <button className='visited-btn' onClick={() => this.props.toggleBreweryToUserList(this.props.brewery.id, 'breweriesVisited')}>Unmark as Visited</button> :
              <button className='visited-btn' onClick={() => this.props.toggleBreweryToUserList(this.props.brewery.id, 'breweriesVisited')}>Mark as Visited</button>
            }
          </section>
        </section>
      </section>
    )
  }
}

BreweryDetails.propTypes = {
  brewery: propTypes.object.isRequired,
  toggleBreweryToUserList: propTypes.func.isRequired,
  breweriesVisited: propTypes.array.isRequired,
  breweriesToVisit: propTypes.array.isRequired
}

export default BreweryDetails 