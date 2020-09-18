import React from 'react'
import BreweryCard from './BreweryCard.js'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('BreweryCard', () => {
  it('should display the brewery name and type plus an icon when rendered', () => {

    render (
      <BrowserRouter>
        <BreweryCard
          name='Denver Brews'
          type='bar'
          id={1}
          addBreweryToUserList={jest.fn()}
          inBreweriesToVisit={null}
          inBreweriesVisited={null}
        />
      </BrowserRouter>
    )

    const cardTitle = screen.getByRole('heading', {name: 'Denver Brews'});
    const cardType = screen.getByText('Type: bar');
    const icon = screen.getByAltText('bottle cap');

    expect(cardTitle).toBeInTheDocument(); 
    expect(cardType).toBeInTheDocument(); 
    expect(icon).toBeInTheDocument(); 
  });

  it('should have a To Visit tag if brewery is in user\'s To Visit list', () => {

    const breweryToVisit = {
      id: 1,
      name: 'Denver Brews',
      brewery_type: 'micro',
      street: '1 Lavender Ave',
      city: 'Denver',
      state: 'Colorado',
      postal_code: '12345',
      country: 'United States',
      longitute: '-100',
      latitude: '30',
      phone: '1112223333',
      website_url: 'http://brews.com',
      updated_at: '2020-01-01T21:21:20.283Z'
    }

    render(
      <BrowserRouter>
        <BreweryCard
          name='Denver Brews'
          type='bar'
          id={1}
          addBreweryToUserList={jest.fn()}
          inBreweriesToVisit={breweryToVisit}
          inBreweriesVisited={null}
        />
      </BrowserRouter>
    )

    const ToVisitTag = screen.getByText('To Visit', {exact: true});

    expect(ToVisitTag).toBeInTheDocument();
  });

  it('should have a Visited tag if brewery is in user\'s Visited list', () => {

    const breweryVisited = {
      id: 1,
      name: 'Denver Brews',
      brewery_type: 'micro',
      street: '1 Lavender Ave',
      city: 'Denver',
      state: 'Colorado',
      postal_code: '12345',
      country: 'United States',
      longitute: '-100',
      latitude: '30',
      phone: '1112223333',
      website_url: 'http://brews.com',
      updated_at: '2020-01-01T21:21:20.283Z'
    }

    render(
      <BrowserRouter>
        <BreweryCard
          name='Denver Brews'
          type='bar'
          id={1}
          addBreweryToUserList={jest.fn()}
          inBreweriesToVisit={null}
          inBreweriesVisited={breweryVisited}
        />
      </BrowserRouter>
    )

    const VisitedTag = screen.getByText('Visited', { exact: true });

    expect(VisitedTag).toBeInTheDocument();
  })
})