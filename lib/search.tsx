import getSlug from './get-slug'

// Removes empty query parameters from the query object
export const filterQuery = (query: any) =>
  Object.keys(query).reduce<any>((obj, key) => {
    if (query[key]?.length) {
      obj[key] = query[key]
    }
    return obj
  }, {})

export const getCategoryPath = (path: string, brand?: string) => {
  const category = getSlug(path)

  return `/search${brand ? `/brands/${brand}` : ''}${
    category ? `/${category}` : ''
  }`
}

export const getBrandPath = (path: string, category?: string) => {
  const brand = getSlug(path).replace(/^brands/, 'brands')

  return `/search${brand ? `/${brand}` : ''}${category ? `/${category}` : ''}`
}
