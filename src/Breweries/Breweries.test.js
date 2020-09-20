import React from 'react'
import Breweries from './Breweries.js'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('Breweries', () => {
  it('should display the correct content when rendered with search results', () => {

    const results = [
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

    render (
      <BrowserRouter>
        <Breweries 
          searchResults={results}
          toggleBreweryToUserList={jest.fn()}
          breweriesToVisit={[]}
          breweriesVisited={[]}
          filterSearchResults={jest.fn()}
          filteredSearchResults={[]}
          filtered={false}
          resetFilter={jest.fn()}
        />
      </BrowserRouter>
    )

      const resultsHeading = screen.getByRole('heading', {name: 'Search Results'});
      const filterHeading = screen.getByText('Filter by brewery type:');
      const breweryCard1 = screen.getByRole('heading', {name: 'Denver Brews'});
      const breweryCard2 = screen.getByRole('heading', {name: 'Portland Brews'});

      expect(resultsHeading).toBeInTheDocument(); 
      expect(filterHeading).toBeInTheDocument();
      expect(breweryCard1).toBeInTheDocument(); 
      expect(breweryCard2).toBeInTheDocument(); 
  });

  it('should display only filtered search results if the filter has been used', () => {

    const results = [
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

    const filteredResults = [
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
      }
    ]

    render(
      <BrowserRouter>
        <Breweries
          searchResults={results}
          toggleBreweryToUserList={jest.fn()}
          breweriesToVisit={[]}
          breweriesVisited={[]}
          filterSearchResults={jest.fn()}
          filteredSearchResults={filteredResults}
          filtered={true}
          resetFilter={jest.fn()}
        />
      </BrowserRouter>
    );

    const breweryCard1 = screen.getByRole('heading', { name: 'Denver Brews' });

    expect(breweryCard1).toBeInTheDocument(); 
  });

  it('should display an error message if there are no filtered results', () => {

    const results = [
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

    const filteredResults = []

    render(
      <BrowserRouter>
        <Breweries
          searchResults={results}
          toggleBreweryToUserList={jest.fn()}
          breweriesToVisit={[]}
          breweriesVisited={[]}
          filterSearchResults={jest.fn()}
          filteredSearchResults={filteredResults}
          filtered={true}
          resetFilter={jest.fn()}
        />
      </BrowserRouter>
    );

    const noFilteredResults = screen.getByText('Sorry, no results match your filter term(s).')

    expect(noFilteredResults).toBeInTheDocument();
  })
})