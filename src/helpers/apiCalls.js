export default class ApiCalls {
  constructor() {
    this.baseURL = 'https://api.openbrewerydb.org/breweries?';
  }

  fetchSearchResults = (searchTerm, pageNum) => {
    return fetch(`${this.baseURL}by_city=${searchTerm}&per_page=50&page=${pageNum}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      } else {
        return response.json();
      }
    })
  }

}