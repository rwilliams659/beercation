import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { fetchSearchResults, fetchBreweryByName } from '../helpers/apiCalls'
jest.mock('../helpers/apiCalls.js')

describe('App', () => {
  it('should bring users to the correct views when using the navigation for Home and To Visit', () => {

    render(
      <MemoryRouter>
        < App />
      </MemoryRouter>
    )

    const toVisitLink = screen.getByRole('link', { name: 'TO VISIT' });
    const homeLink = screen.getByRole('link', { name:'HOME' });

    fireEvent.click(toVisitLink);

    const toVisitHeading = screen.getByRole('heading', { name: 'Breweries To Visit'})

    expect(toVisitHeading).toBeInTheDocument(); 

    fireEvent.click(homeLink);

    const homeHeading = screen.getByRole('heading', { name: 'Welcome to Beercation!'});

    expect(homeHeading).toBeInTheDocument();
  });

  it('should bring users to the correct views when using the navigation for Visited, plus the logo and h1', () => {

    render(
      <MemoryRouter>
        < App />
      </MemoryRouter>
    )

    const visitedLink = screen.getByRole('link', { name: 'VISITED' });
    const logoLink = screen.getByAltText('BEERCATION');
    const siteNameLink = screen.getByRole('heading', { name: 'BEERCATION' });

    fireEvent.click(logoLink);

    const homeHeading = screen.getByRole('heading', { name: 'Welcome to Beercation!' }); 

    expect(homeHeading).toBeInTheDocument();

    fireEvent.click(visitedLink);

    const visitedHeading = screen.getByRole('heading', { name: 'Breweries Visited' });

    expect(visitedHeading).toBeInTheDocument();

    fireEvent.click(siteNameLink);

    const homeView = screen.getByRole('heading', { name: 'Welcome to Beercation!' }); 

    expect(homeView).toBeInTheDocument(); 
  });
})