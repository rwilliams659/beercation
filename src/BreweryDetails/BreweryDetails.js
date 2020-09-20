import React, { Component } from 'react'
import './BreweryDetails.css'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { fetchBreweryByName } from '../helpers/apiCalls'

class BreweryDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brewery: {},
      error: ''
    }
  }

  componentDidMount = () => {
    fetchBreweryByName(this.props.name)
      .then(brewery => {
        if (brewery.length > 0) {
          this.setState({ brewery: brewery[0] })
        } else {
          this.setState({ error: 'Sorry, we couldn\'t locate that brewery.'})
        }
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const inBreweriesToVisit = this.props.breweriesToVisit.find(savedBrewery => savedBrewery.id === this.state.brewery.id)
    const inBreweriesVisited = this.props.breweriesVisited.find(savedBrewery => savedBrewery.id === this.state.brewery.id);

    return (
    <>
    { Object.keys(this.state.brewery).length === 0 && !this.state.error &&
      <h2>One moment please...</h2>
    }
    { this.state.error &&
      <h2>{this.state.error}</h2>
    }
      { Object.keys(this.state.brewery).length > 0 && 
      <section className='BreweryDetails'>
        <section className='img-column'>
          <Link to='/' className='back-link'><button className='back-btn'>← Back to Results</button></Link>
          <div className='brewery-img' title='brewery'>
            {inBreweriesToVisit ? <p className='tag1 tags' aria-label={`${this.state.brewery.name} marked as "to visit"`}>To Visit</p> : ''}
            {inBreweriesVisited ? <p className='tag2 tags' aria-label={`${this.state.brewery.name} marked as "visited"`}>Visited</p> : ''}
          </div>
        </section>
        <section className='brewery-info'>
          <h2>{this.state.brewery.name}</h2>
          <p>Address:<br />{this.state.brewery.street}<br />{this.state.brewery.city}, {this.state.brewery.state} {this.state.brewery.postal_code}</p>
          <p>Telephone: {this.state.brewery.phone}</p>
            <a href={this.state.brewery.website_url} target='_blank' rel='noopener noreferrer' className='brewery-link'>Learn more →</a>
          <section className='add-btns details-btns'>
            {inBreweriesToVisit ?
                <button className='to-visit-btn' onClick={() => this.props.toggleBreweryToUserList(this.state.brewery.name, 'breweriesToVisit')} aria-label={`Unmark ${this.state.brewery.name} as To Visit`}>Unmark as To Visit</button> :
                <button className='to-visit-btn' onClick={() => this.props.toggleBreweryToUserList(this.state.brewery.name, 'breweriesToVisit')} aria-label={`Mark ${this.state.brewery.name} as To Visit`}>Mark as To Visit</button>
            }
            {inBreweriesVisited ?
              <button className='visited-btn' onClick={() => this.props.toggleBreweryToUserList(this.state.brewery.name, 'breweriesVisited')} aria-label={`Unmark ${this.state.brewery.name} as Visited`}>Unmark as Visited</button> :
              <button className='visited-btn' onClick={() => this.props.toggleBreweryToUserList(this.state.brewery.name, 'breweriesVisited')}  aria-label={`Mark ${this.state.brewery.name} as Visited`}>Mark as Visited</button>
            }
          </section>
        </section>
      </section>
      }
    </>
    )
  }
}

BreweryDetails.propTypes = {
  name: propTypes.string.isRequired,
  toggleBreweryToUserList: propTypes.func.isRequired,
  breweriesVisited: propTypes.array.isRequired,
  breweriesToVisit: propTypes.array.isRequired
}

export default BreweryDetails 