import React from 'react'
import BreweryDetails from './BreweryDetails'
import { screen, render, waitFor } from '@testing-library/react'
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
  })
})