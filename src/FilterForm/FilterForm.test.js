import React from 'react'
import FilterForm from './FilterForm'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('FilterForm', () => {
  it('should display a form when rendered', () => {

    render(
      <BrowserRouter>
        <FilterForm 
          searchResults={[]}
          filterSearchResults={jest.fn()}
          resetFilter={jest.fn()}
        />
      </BrowserRouter>
    )

    const filterHeading = screen.getByText('Filter by brewery type:');
    const input1 = screen.getByRole('checkbox', {name: 'Bar'});
    const input2 = screen.getByRole('checkbox', { name: 'Brewpub' });
    const input3 = screen.getByRole('checkbox', { name: 'Microbrewery' });
    const input4 = screen.getByRole('checkbox', { name: 'Large' });
    const input5 = screen.getByRole('checkbox', { name: 'Regional' });
    const input6 = screen.getByRole('checkbox', { name: 'Other' });
    const filterBtn = screen.getByRole('button', {name: 'Filter search'})

    expect(filterHeading).toBeInTheDocument();
    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(input3).toBeInTheDocument();
    expect(input4).toBeInTheDocument();
    expect(input5).toBeInTheDocument();
    expect(input6).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
  });

  it('when a user selects filter terms, their checked values should reflect what was chosen', () => {

    render(
      <BrowserRouter>
        <FilterForm
          searchResults={[]}
          filterSearchResults={jest.fn()}
          resetFilter={jest.fn()}
        />
      </BrowserRouter>
    )

    const input1 = screen.getByRole('checkbox', { name: 'Bar' });
    const input2 = screen.getByRole('checkbox', { name: 'Brewpub' });
    const input3 = screen.getByRole('checkbox', { name: 'Microbrewery' });

    fireEvent.click(input1); 
    fireEvent.click(input3)

    expect(input1.checked).toBe(true);
    expect(input2.checked).toBe(false);
    expect(input3.checked).toBe(true);
  });

  it('should call filterSearchResults after user selects filter terms and clicks the filter button', () => {

    const mockFilterSearchResults = jest.fn()
    
    const searchResults = [
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
        <FilterForm
          searchResults={searchResults}
          filterSearchResults={mockFilterSearchResults}
          resetFilter={jest.fn()}
        />
      </BrowserRouter>
    )

    const input1 = screen.getByRole('checkbox', { name: 'Bar' });
    const filterBtn = screen.getByRole('button', { name: 'Filter search' })

    fireEvent.click(input1);
    fireEvent.click(filterBtn);

    expect(mockFilterSearchResults).toHaveBeenCalledTimes(1);
    expect(mockFilterSearchResults).toHaveBeenCalledWith(['bar']);
  });

  it('should call resetFilter when Clear filter button is clicked', () => {

    const mockResetFilter = jest.fn();
    
    const searchResults = [
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
        <FilterForm
          searchResults={searchResults}
          filterSearchResults={jest.fn()}
          resetFilter={mockResetFilter}
        />
      </BrowserRouter>
    )

    const clearFilterBtn = screen.getByRole('button', { name: 'Clear all filters X'})

    fireEvent.click(clearFilterBtn);

    expect(mockResetFilter).toHaveBeenCalledTimes(1);
  });

})