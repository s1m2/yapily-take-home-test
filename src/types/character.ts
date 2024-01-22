type Thumbnail = {
  path: string
  extension: string
}

type Comic = {
  resourceURI: string
  name: string
}

type Series = {
  resourceURI: string
  name: string
}

type Story = {
  resourceURI: string
  name: string
  type: string
}

type Event = {
  resourceURI: string
  name: string
}

type Url = {
  type: string
  url: string
}

export type Character = {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: Thumbnail
  resourceURI: string
  comics: {
    available: number
    collectionURI: string
    items: Comic[]
    returned: number
  }
  series: {
    available: number
    collectionURI: string
    items: Series[]
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: Story[]
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: Event[]
    returned: number
  }
  urls: Url[]
}

export type MarvelApiResponse = {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Character[]
  }
}
