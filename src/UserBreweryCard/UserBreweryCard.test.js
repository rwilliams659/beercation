import React from 'react'
import UserBreweryCard from '../UserBreweryCard/UserBreweryCard'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('UserBreweryCard', () => {
  it('should display the correct content when rendered on the To Visit page', () => {

    render(
      <BrowserRouter>
        <UserBreweryCard
          name='Denver Brews'
          type='micro'
          id={1}
          city='Denver'
          state='Colorado'
          view='To Visit'
          toggleBreweryToUserList={jest.fn()}
        />
      </BrowserRouter>
    )

    const icon = screen.getByAltText('bottle cap');
    const breweryName = screen.getByRole('heading', {name: 'Denver Brews'});
    const type = screen.getByText('Type: micro');
    const location = screen.getByText('Denver, Colorado');
    const button = screen.getByRole('button', {name: 'Unmark as To Visit'});

    expect(icon).toBeInTheDocument(); 
    expect(breweryName).toBeInTheDocument(); 
    expect(type).toBeInTheDocument(); 
    expect(location).toBeInTheDocument(); 
    expect(button).toBeInTheDocument(); 
  });

  it('should display the correct content when rendered on the Visited page', () => {

    render(
      <BrowserRouter>
        <UserBreweryCard
          name='Denver Brews'
          type='micro'
          id={1}
          city='Denver'
          state='Colorado'
          view='Visited'
          toggleBreweryToUserList={jest.fn()}
        />
      </BrowserRouter>
    )

    const icon = screen.getByAltText('bottle cap');
    const breweryName = screen.getByRole('heading', { name: 'Denver Brews' });
    const type = screen.getByText('Type: micro');
    const location = screen.getByText('Denver, Colorado');
    const button = screen.getByRole('button', { name: 'Unmark as Visited' });

    expect(icon).toBeInTheDocument();
    expect(breweryName).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })
})