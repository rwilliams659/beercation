import React from 'react'
import SearchForm from './SearchForm'
import { render, screen, fireEvent } from '@testing-library/react'
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

  it('should display an error message if an error is passed down in props', () => {

    render(
      <BrowserRouter>
        <SearchForm
          getSearchResults={jest.fn()}
          error={'Sorry, we couldn\'t find any results in Sweden.'}
        />
      </BrowserRouter>
    )

    const errorMsg = screen.getByText('Sorry, we couldn\'t find any results in Sweden.')

    expect(errorMsg).toBeInTheDocument(); 
  });

  it('when a user types in a search term, the input value should reflect what was typed', () => {

    render(
      <BrowserRouter>
        <SearchForm
          getSearchResults={jest.fn()}
          error=''
        />
      </BrowserRouter>
    )

    const searchBar = screen.getByPlaceholderText('Enter a city name');

    fireEvent.change(searchBar, {target: {value: 'Denver'}});

    expect(searchBar.value).toBe('Denver');
  });

  it('should fire handleSubmit when the search button is clicked', () => {

    const mockGetSearchResults = jest.fn(); 

    render(
      <BrowserRouter>
        <SearchForm
          getSearchResults={mockGetSearchResults}
          error=''
        />
      </BrowserRouter>
    )

    const searchBar = screen.getByPlaceholderText('Enter a city name');
    const searchBtn = screen.getByRole('button');

    fireEvent.change(searchBar, { target: { value: 'Denver' } });
    fireEvent.click(searchBtn);

    expect(mockGetSearchResults).toHaveBeenCalledTimes(1);
    expect(mockGetSearchResults).toBeCalledWith('Denver')
  });


})

//sad path for handleSubmit; error msg? or disable btn until has value