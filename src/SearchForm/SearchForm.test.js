import React from 'react'
import SearchForm from './SearchForm'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('Search Form', () => {
  it('should display the correct content when rendered', () => {

    render(
      <BrowserRouter>
        <SearchForm 
          getSearchResults={jest.fn()}
          error=''
        />
      </BrowserRouter>
    )

    const heading = screen.getByRole('heading', { name: 'Welcome to Beercation!'});
    const intro = screen.getByText('Thirsting for the best brews in the top US cities? Let us help you plan your next brew-tastic city vacation.');
    const formText = screen.getByText('Search the city you plan to visit below to see a list of breweries, bars, and brewpubs in the area.');
    const searchBar = screen.getByPlaceholderText('Enter a city name');
    const searchBtn = screen.getByRole('button')

    expect(heading).toBeInTheDocument();
    expect(intro).toBeInTheDocument(); 
    expect(formText).toBeInTheDocument(); 
    expect(searchBar).toBeInTheDocument(); 
    expect(searchBtn).toBeInTheDocument(); 
  });


})