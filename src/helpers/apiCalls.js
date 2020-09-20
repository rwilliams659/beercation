const baseURL = 'https://api.openbrewerydb.org/breweries?';

export const fetchSearchResults = (searchTerm, pageNum) => {
  return fetch(`${baseURL}by_city=${searchTerm}&per_page=50&page=${pageNum}`)
    .then(response => checkResponse(response))
}

export const fetchBreweryByName = (name) => {
  return fetch(`${baseURL}by_name=${name}`)
    .then(response => checkResponse(response))
}

export const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText)
  } else {
    return response.json();
  }
}
