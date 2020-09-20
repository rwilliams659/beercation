import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { fetchSearchResults, fetchBreweryByName } from '../helpers/apiCalls'
jest.mock('../helpers/apiCalls.js')
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('should')

  //write out all the types of tests I need before I implement! Should be a TON; start by first going through each component 1 by 1
  //then add user stories 
})