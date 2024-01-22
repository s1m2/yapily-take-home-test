import type { Character } from '@/types/character'

/**
 * handleErrors check if the response ok is true or false
 * if it's true it returns the response
 * if it's false it throws an exception
 */
export const handleErrors = (response: Response) => {
  if (!response.ok) throw response
  return response
}

/**
 * createPaginatedResults creates an array of arrays of characters
 */
export const createPaginatedResults = (characters: Character[], itemsPerPage: number = 9) => {
  const totalPages = Math.ceil(characters.length / itemsPerPage)
  if (characters.length <= itemsPerPage) return { characters, totalPages }
  const paginatedResults = []

  for (let i = 0; i < totalPages; i++) {
    paginatedResults[i] = characters.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  }
  return { paginatedResults, totalPages }
}

/**
 * updateDetails updates the name and thumbnail of a character
 */
export const updateDetails = (
  characters: Character[],
  characterId: number,
  { name, thumbnail }: { name: string; thumbnail: string }
) => {
  return characters.map((character) => {
    if (character.id === characterId) {
      return {
        ...character,
        name,
        thumbnail: {
          ...character.thumbnail,
          path: thumbnail
        }
      }
    }
    return character
  })
}

/**
 * checkImagePath checks if the image path is a base64 string
 * if it is it returns the path
 * if it's not it returns the path with the extension
 */
export const checkImagePath = (character: Character) => {
  if (character.thumbnail.path.includes('base64')) {
    return character.thumbnail.path
  } else {
    return character.thumbnail.path + '.' + character.thumbnail.extension
  }
}

/**
 * checkFromLocalStorage checks if the key exists in the local storage
 */
export const checkFromLocalStorage = (key: string) => {
  const storedCharacters = localStorage.getItem(key)
  if (!storedCharacters) return false
  return true
}

/**
 * invalidateLocalStorageIfExpired checks if the key exists in the local storage
 * if it does it checks if the timestamp is older than 10 minutes
 * if it is it removes the key from the local storage
 */
export const invalidateLocalStorageIfExpired = () => {
  const time = localStorage.getItem('timestamp')
  if (!time) return
  const { timestamp } = JSON.parse(time)
  const now = new Date().getTime()
  if (now - timestamp > 600000) {
    localStorage.removeItem('marvelCharacters')
  }
}
