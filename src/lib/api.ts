import { handleErrors } from './utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const getMarvelCharacters = () => {
  return fetch(`${BASE_URL}?limit=100&apikey=${API_KEY}`).then((response) => handleErrors(response))
}
