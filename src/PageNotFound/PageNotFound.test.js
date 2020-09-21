import React from 'react'
import PageNotFound from './PageNotFound'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('PageNotFound', () => {
  it('should display a page not found message when rendered', () => {

    render(
      <BrowserRouter>
        <PageNotFound/>
      </BrowserRouter>
    )

    const PageNotFoundHeading = screen.getByRole('heading', {
      name: 'Oops, we couldn\'t find that page!'});
    const message = screen.getByText('We suggest you navigate to the');

    expect(PageNotFoundHeading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  })
})