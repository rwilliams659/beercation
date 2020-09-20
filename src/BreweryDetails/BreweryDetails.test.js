import React from 'react'
import BreweryDetails from './BreweryDetails'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter} from 'react-router-dom'
import { fetchBreweryByName} from '../helpers/apiCalls'
jest.mock('../helpers/apiCalls');

describe('BreweryDetails', () => {
  it('should display brewery details when rendered', async () => {

    fetchBreweryByName.mockResolvedValue([
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
    ])

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={jest.fn()}
          breweriesVisited={[]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const backBtn = await waitFor(() => screen.getByRole('button', { name: '← Back to Results'}));
    const image = await waitFor(() => screen.getByTitle('brewery'));
    const name = await waitFor(() => screen.getByRole('heading', { name: 'Denver Brews'}));
    const address = await waitFor(() => screen.getByText('1 Lavender Ave', { exact: false }));
    const phone = await waitFor(() => screen.getByText('Telephone: 1112223333'));
    const markToVisitBtn = await waitFor(() => screen.getByRole('button', { name: 'Mark as To Visit'}));
    const markVisitedBtn = await waitFor(() => screen.getByRole('button', {name: 'Mark as Visited'}))

    expect(backBtn).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(markToVisitBtn).toBeInTheDocument();
    expect(markVisitedBtn).toBeInTheDocument();
  });

  it('should display a loading screen while details are being fetched', () => {

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={jest.fn()}
          breweriesVisited={[]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const loadingScreen = screen.getByText('One moment please...')

    expect(loadingScreen).toBeInTheDocument();
  });

  it('should display an error message if fetch returns empty array', async () => {
    fetchBreweryByName.mockResolvedValue([])

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={jest.fn()}
          breweriesVisited={[]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const errorMsg = await waitFor(() => screen.getByText('Sorry, we couldn\'t locate that brewery.'));

    expect(errorMsg).toBeInTheDocument();
  });

  it('should display an error message if fetch is not successful', async () => {
    fetchBreweryByName.mockRejectedValue('No brewery found')

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={jest.fn()}
          breweriesVisited={[]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const errorMsg = await waitFor(() => screen.getByText('No brewery found'));

    expect(errorMsg).toBeInTheDocument();
  });

  it('should indicate if it\'s in user\'s To Visit list', async () => {

    const brewery = {
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

    fetchBreweryByName.mockResolvedValue([brewery])

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={jest.fn()}
          breweriesVisited={[]}
          breweriesToVisit={[brewery]}
        />
      </BrowserRouter>
    )

  const toVisitTag = await waitFor(() => screen.getByText('To Visit', { exact: true}));
  const toVisitBtn = await waitFor(() => screen.getByRole('button', { name: 'Unmark as To Visit'}));

  expect(toVisitTag).toBeInTheDocument();
  expect(toVisitBtn).toBeInTheDocument(); 
  });

  it('should indicate if it\'s in user\'s Visited list', async () => {

    const brewery = {
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

    fetchBreweryByName.mockResolvedValue([brewery])

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={jest.fn()}
          breweriesVisited={[brewery]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const visitedTag = await waitFor(() => screen.getByText('Visited', { exact: true }));
    const visitedBtn = await waitFor(() => screen.getByRole('button', { name: 'Unmark as Visited' }));

    expect(visitedTag).toBeInTheDocument();
    expect(visitedBtn).toBeInTheDocument();
  });

  it('when a user clicks "Mark as To Visit", toggleBreweryToUserList should be called', async () => {
    fetchBreweryByName.mockResolvedValue([
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
    ])

    const mockToggleBreweryToUserList = jest.fn(); 

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={mockToggleBreweryToUserList}
          breweriesVisited={[]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const markToVisitBtn = await waitFor(() => screen.getByRole('button', { name: 'Mark as To Visit' }));
    
    fireEvent.click(markToVisitBtn);

    expect(mockToggleBreweryToUserList).toHaveBeenCalledTimes(1);
    expect(mockToggleBreweryToUserList).toHaveBeenCalledWith('Denver Brews', 'breweriesToVisit');
  });

  it('when a user clicks "Mark as Visited", toggleBreweryToUserList should be called', async () => {
    fetchBreweryByName.mockResolvedValue([
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
    ])

    const mockToggleBreweryToUserList = jest.fn();

    render(
      <BrowserRouter>
        <BreweryDetails
          name='Denver_Brews'
          toggleBreweryToUserList={mockToggleBreweryToUserList}
          breweriesVisited={[]}
          breweriesToVisit={[]}
        />
      </BrowserRouter>
    )

    const markVisitedBtn = await waitFor(() => screen.getByRole('button', { name: 'Mark as Visited' }));

    fireEvent.click(markVisitedBtn);

    expect(mockToggleBreweryToUserList).toHaveBeenCalledTimes(1);
    expect(mockToggleBreweryToUserList).toHaveBeenCalledWith('Denver Brews', 'breweriesVisited');
  })
})