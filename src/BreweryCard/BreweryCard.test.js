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
        />
      </BrowserRouter>
    )

    const cardTitle = screen.getByRole('heading', {name: 'Denver Brews'});
    const cardType = screen.getByText('Type: bar');
    const icon = screen.getByAltText('bottle cap');

    expect(cardTitle).toBeInTheDocument(); 
    expect(cardType).toBeInTheDocument(); 
    expect(icon).toBeInTheDocument(); 
  })
})