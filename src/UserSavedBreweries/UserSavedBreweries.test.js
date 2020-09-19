import React from 'react'
import UserSavedBreweries from '../UserSavedBreweries/UserSavedBreweries'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('UserSavedBreweries', () => {
  it('should display a message prompting a user to add breweries to their list if there are none saved yet on the To Visit page', () => {

    render(
      <BrowserRouter>
        <UserSavedBreweries
          userBreweries={[]}
          view='To Visit'
          toggleBreweryToUserList={jest.fn()}
        />
      </BrowserRouter>
    )

    const message = screen.getByText('You don\'t get have any breweries set as "To Visit" yet! Return to the homepage to search for new breweries and add them to your lists.');

    expect(message).toBeInTheDocument(); 
  });

  it('should display a message prompting a user to add breweries to their list if there are none saved yet on the Visted page', () => {

    render(
      <BrowserRouter>
        <UserSavedBreweries
          userBreweries={[]}
          view='Visited'
          toggleBreweryToUserList={jest.fn()}
        />
      </BrowserRouter>
    )

    const message = screen.getByText('You don\'t get have any breweries set as "Visited" yet! Return to the homepage to search for new breweries and add them to your lists.');

    expect(message).toBeInTheDocument();
  });

  it('should display breweries marked as To Visit when rendered on the To Visit page', () => {

    const userBreweries = [
      {
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
      },
      {
        id: 2,
        name: 'Portland Brews',
        brewery_type: 'brewpub',
        street: '2 Drurey Lane',
        city: 'Portland',
        state: 'Oregon',
        postal_code: '67890',
        country: 'United States',
        longitute: '-50',
        latitude: '40',
        phone: '1384028482',
        website_url: 'http://brews-2.com',
        updated_at: '2017-05-03T21:21:20.283Z'
      }
    ]

    render(
      <BrowserRouter>
        <UserSavedBreweries
          userBreweries={userBreweries}
          view='To Visit'
          toggleBreweryToUserList={jest.fn()}
        />
      </BrowserRouter>
    )

    const heading = screen.getByRole('heading', {name: 'Breweries To Visit'});
    const card1 = screen.getByRole('heading', {name: 'Denver Brews'});
    const card2 = screen.getByRole('heading', {name: 'Portland Brews'});

    expect(heading).toBeInTheDocument(); 
    expect(card1).toBeInTheDocument(); 
    expect(card2).toBeInTheDocument(); 
  });

  it('should display breweries marked as Visited when rendered on the Visited page', () => {

    const userBreweries = [
      {
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
      },
      {
        id: 2,
        name: 'Portland Brews',
        brewery_type: 'brewpub',
        street: '2 Drurey Lane',
        city: 'Portland',
        state: 'Oregon',
        postal_code: '67890',
        country: 'United States',
        longitute: '-50',
        latitude: '40',
        phone: '1384028482',
        website_url: 'http://brews-2.com',
        updated_at: '2017-05-03T21:21:20.283Z'
      }
    ]

    render(
      <BrowserRouter>
        <UserSavedBreweries
          userBreweries={userBreweries}
          view='Visited'
          toggleBreweryToUserList={jest.fn()}
        />
      </BrowserRouter>
    )

    const heading = screen.getByRole('heading', { name: 'Breweries Visited' });
    const card1 = screen.getByRole('heading', { name: 'Denver Brews' });
    const card2 = screen.getByRole('heading', { name: 'Portland Brews' });

    expect(heading).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  })
})