import { describe, it, expect } from 'vitest'
import {
  handleErrors,
  createPaginatedResults,
  updateDetails,
  checkImagePath,
  checkFromLocalStorage,
  invalidateLocalStorageIfExpired
} from '../utils'

describe('handleErrors', () => {
  it('should return the response if response.ok is true', () => {
    const response = { ok: true }
    expect(handleErrors(response)).toStrictEqual({ ok: true })
  })

  it('should throw an error if response.ok is false', () => {
    const response = { ok: false }
    expect(() => handleErrors(response)).toThrow()
  })
})

describe('createPaginatedResults', () => {
  it('should return an object with the characters and totalPages if the characters length is less than or equal to the itemsPerPage', () => {
    const characters = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const itemsPerPage = 9
    expect(createPaginatedResults(characters, itemsPerPage)).toStrictEqual({
      characters,
      totalPages: 1
    })
  })

  it('should return an object with the paginatedResults and totalPages if the characters length is greater than the itemsPerPage', () => {
    const characters = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const itemsPerPage = 2
    expect(createPaginatedResults(characters, itemsPerPage)).toStrictEqual({
      paginatedResults: [[{ id: 1 }, { id: 2 }], [{ id: 3 }]],
      totalPages: 2
    })
  })
})

describe('updateDetails', () => {
  it('should return an array of characters with the updated character', () => {
    const characters = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const characterId = 2
    const name = 'name'
    const thumbnail = 'thumbnail'
    expect(updateDetails(characters, characterId, { name, thumbnail })).toStrictEqual([
      { id: 1 },
      { id: 2, name, thumbnail: { path: thumbnail } },
      { id: 3 }
    ])
  })
})

describe('checkImagePath', () => {
  it('should return the character thumbnail path if it includes base64', () => {
    const character = { thumbnail: { path: 'base64' } }
    expect(checkImagePath(character)).toBe('base64')
  })

  it('should return the character thumbnail path with the extension if it does not include base64', () => {
    const character = { thumbnail: { path: 'path', extension: 'extension' } }
    expect(checkImagePath(character)).toBe('path.extension')
  })
})

describe('checkFromLocalStorage', () => {
  it('should return false if the item does not exist in localStorage', () => {
    expect(checkFromLocalStorage('item')).toBe(false)
  })

  it('should return the item from localStorage if it exists', () => {
    const item = 'item'
    localStorage.setItem('item', item)
    expect(checkFromLocalStorage('item')).toBe(true)
  })
})

describe('invalidateLocalStorageIfExpired', () => {
  it('should remove "marvelCharacters" from localStorage if the timestamp is expired', () => {
    const timestamp = Date.now() - 700000
    const item = { timestamp }
    localStorage.setItem('timestamp', JSON.stringify(item))
    localStorage.setItem('marvelCharacters', 'characters')

    invalidateLocalStorageIfExpired()

    expect(localStorage.getItem('marvelCharacters')).toBeNull()
  })

  it('should not remove "marvelCharacters" from localStorage if the timestamp is not expired', () => {
    const timestamp = Date.now() - 30000
    const item = { timestamp }
    localStorage.setItem('timestamp', JSON.stringify(item))
    localStorage.setItem('marvelCharacters', 'characters')

    invalidateLocalStorageIfExpired()

    expect(localStorage.getItem('marvelCharacters')).toBe('characters')
  })

  it('should not remove "marvelCharacters" from localStorage if the timestamp does not exist', () => {
    localStorage.removeItem('timestamp')
    localStorage.setItem('marvelCharacters', 'characters')

    invalidateLocalStorageIfExpired()

    expect(localStorage.getItem('marvelCharacters')).toBe('characters')
  })
})
