import React from 'react'
import BreweryCard from './BreweryCard.js'
import { render, screen, fireEvent } from '@testing-library/react'
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
          city='Denver'
          state='Colorado'
          addBreweryToUserList={jest.fn()}
          inBreweriesToVisit={null}
          inBreweriesVisited={null}
        />
      </BrowserRouter>
    )

    const cardTitle = screen.getByRole('heading', {name: 'Denver Brews'});
    const cardType = screen.getByText('Type: bar');
    const icon = screen.getByAltText('bottle cap');
    const type = screen.getByText('Type: bar');
    const location = screen.getByText('Denver, Colorado')
    const toVisitBtn = screen.getByRole('button', { name: 'Mark as To Visit'});
    const visitedBtn = screen.getByRole('button', { name: 'Mark as Visited'});

    expect(cardTitle).toBeInTheDocument(); 
    expect(cardType).toBeInTheDocument(); 
    expect(icon).toBeInTheDocument(); 
    expect(type).toBeInTheDocument(); 
    expect(location).toBeInTheDocument(); 
    expect(toVisitBtn).toBeInTheDocument(); 
    expect(visitedBtn).toBeInTheDocument(); 
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
          city='Denver'
          state='Colorado'
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
          city='Denver'
          state='Colorado'
          addBreweryToUserList={jest.fn()}
          inBreweriesToVisit={null}
          inBreweriesVisited={breweryVisited}
        />
      </BrowserRouter>
    )

    const VisitedTag = screen.getByText('Visited', { exact: true });

    expect(VisitedTag).toBeInTheDocument();
  });
  it('should call addBreweryToUserList when either button below the brewery card is clicked', () => {

    const mockAddBreweryToUserList = jest.fn();

    render(
      <BrowserRouter>
        <BreweryCard
          name='Denver Brews'
          type='bar'
          id={1}
          city='Denver'
          state='Colorado'
          addBreweryToUserList={mockAddBreweryToUserList}
          inBreweriesToVisit={null}
          inBreweriesVisited={null}
        />
      </BrowserRouter>
    )

    const toVisitBtn = screen.getByRole('button', { name: 'Mark as To Visit' });
    const visitedBtn = screen.getByRole('button', { name: 'Mark as Visited' });
    
    fireEvent.click(toVisitBtn);
    fireEvent.click(visitedBtn);

    expect(mockAddBreweryToUserList).toHaveBeenCalledTimes(2);
    expect(mockAddBreweryToUserList).toHaveBeenCalledWith(1, 'breweriesToVisit')
    expect(mockAddBreweryToUserList).toHaveBeenCalledWith(1, 'breweriesVisited')
  })
})