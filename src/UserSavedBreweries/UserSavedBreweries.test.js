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
  })
})