import React from 'react'
import Header from './Header'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('Header', () => {
  it('should display the correct content when rendered', () => {

    render(
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
    );

    const appName = screen.getByRole('heading', { name: 'BEERCATION' });
    const logo = screen.getByAltText('BEERCATION');
    const nav1 = screen.getByRole('link', { name: 'HOME' });
    const nav2 = screen.getByRole('link', { name: 'TO VISIT' });
    const nav3 = screen.getByRole('link', { name: 'VISITED' });

    expect(appName).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(nav1).toBeInTheDocument();
    expect(nav2).toBeInTheDocument();
    expect(nav3).toBeInTheDocument();
  })
})