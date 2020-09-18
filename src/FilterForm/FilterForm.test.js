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
  })
})