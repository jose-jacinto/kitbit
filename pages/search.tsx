import cn from 'classnames'
import { useState } from 'react'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '@components/core'
import { ProductCard } from '@components/product'
import { Container, Grid, Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'
import getSlug from '@lib/get-slug'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

import { getItems } from 'whitebrim'

const fetchItems = (data: {
  modelName: string
  currentPage: number
  selectedPageSize: number
  filter: any
  q?: string
  multi?: boolean
}) => {
  let params = {
    modelName: data.modelName,
    filters: data.filter,
    q: data.q ? data.q : null, //* search
    pagination: {
      page: data.currentPage,
      limit: data.selectedPageSize,
    },
  }
  return getItems(params)
    .then((res) => ({
      items: res.data.results,
      totalPages: res.data.total_pages,
      error: false,
    }))
    .catch(() => ({
      items: null,
      totalPages: 0,
      error: true,
    }))
}

export async function getStaticProps({}: GetStaticPropsContext) {
  let categoriesItems = {
    modelName: 'categories',
    currentPage: 1,
    selectedPageSize: 6,
    filter: {},
    multi: false,
  }
  let designersItems = {
    modelName: 'designers',
    currentPage: 1,
    selectedPageSize: 6,
    filter: {},
    multi: false,
  }

  const { items: categories } = await fetchItems(categoriesItems)
  const { items: designers } = await fetchItems(designersItems)

  return {
    props: { categories, designers },
  }
}

/* const SORT = Object.entries({
  'latest-desc': 'Latest arrivals',
  'trending-desc': 'Trending',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}) */

export default function Search({
  categories,
  designers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { q } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const [currentQuery, setQuery] = useState<any>(null)
  const [currentCat, setCat] = useState<any>(null)
  const [currentDesigner, setDesigner] = useState<any>(null)

  const [data, setData] = useState<any>(null)

  const renderList = (cat: null | undefined, designer: null | undefined) => {
    let filter: any = {}

    if (cat) {
      filter['category'] = cat
    }
    if (designer) {
      filter['designers'] = designer
    }

    let payload = {
      modelName: 'product',
      currentPage: 1,
      selectedPageSize: 150,
      filter: filter,
      q: typeof q === 'string' ? q : '',
      multi: false,
    }

    fetchItems(payload)
      .then((res) => {
        setQuery(q)
        setData(res)
      })
      .catch((error) => {
        setData(null)
      })
  }

  if (!data || q !== currentQuery) {
    renderList(null, null)
  }

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-2">
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <a
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault()

                  router.push(
                    {
                      pathname: `/search`,
                    },
                    undefined,
                    { shallow: true }
                  )
                  setCat(null)
                  setDesigner(null)
                  renderList(null, null)
                }}
              >
                All Categories
              </a>
            </li>
            {categories.map((category: any) => (
              <li
                key={category._id}
                className={cn('py-1 text-accents-8', {
                  underline: currentCat === category._id,
                })}
              >
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault()

                    const cat = category._id

                    router.push(
                      {
                        pathname: `/search`,
                        query: cat ? { cat } : {},
                      },
                      undefined,
                      { shallow: true }
                    )
                    setCat(cat)
                    setDesigner(null)
                    renderList(cat, null)
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">
              <a
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault()

                  router.push(
                    {
                      pathname: `/search`,
                    },
                    undefined,
                    { shallow: true }
                  )
                  setDesigner(null)
                  setCat(null)
                  renderList(null, null)
                }}
              >
                All Designers
              </a>
            </li>
            {designers.flatMap((brand: any) => (
              <li
                key={brand.path}
                className={cn('py-1 text-accents-8', {
                  underline: currentDesigner === brand._id,
                })}
              >
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault()

                    const designer = brand._id

                    router.push(
                      {
                        pathname: `/search`,
                        query: designer ? { designer } : {},
                      },
                      undefined,
                      { shallow: true }
                    )
                    setCat(null)
                    setDesigner(designer)
                    renderList(null, designer)
                  }}
                >
                  {brand.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-8">
          {(q || currentCat || currentDesigner) && (
            <div className="mb-12 transition ease-in duration-75">
              {data ? (
                <>
                  <span
                    className={cn('animated', {
                      fadeIn: data,
                      hidden: !data,
                    })}
                  >
                    Showing {data.items.length} results{' '}
                    {q && (
                      <>
                        for "<strong>{q}</strong>"
                      </>
                    )}
                  </span>
                  <span
                    className={cn('animated', {
                      fadeIn: !data,
                      hidden: data,
                    })}
                  >
                    {q ? (
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                    ) : (
                      <>
                        There are no products that match the selected category &
                        designer
                      </>
                    )}
                  </span>
                </>
              ) : q ? (
                <>
                  Searching for: "<strong>{q}</strong>"
                </>
              ) : (
                <>Searching...</>
              )}
            </div>
          )}

          {data ? (
            <Grid layout="normal">
              {data.items.map((item: any) => (
                <ProductCard
                  variant="simple"
                  key={item.uri}
                  className="animated fadeIn"
                  product={item}
                  imgWidth={480}
                  imgHeight={480}
                />
              ))}
            </Grid>
          ) : (
            <Grid layout="normal">
              {rangeMap(12, (i) => (
                <Skeleton
                  key={i}
                  className="w-full animated fadeIn"
                  height={325}
                />
              ))}
            </Grid>
          )}
        </div>
        <div className="col-span-2">
          <ul>
            {/* <li className="py-1 text-base font-bold tracking-wide">Sort</li>
            <li
              className={cn('py-1 text-accents-8', {
                underline: !sort,
              })}
            >
              <Link href={{ pathname, query: filterQuery({ q }) }}>
                <a>Relevance</a>
              </Link>
            </li>
            {SORT.map(([key, text]) => (
              <li
                key={key}
                className={cn('py-1 text-accents-8', {
                  underline: sort === key,
                })}
              >
                <Link href={{ pathname, query: filterQuery({ q, sort: key }) }}>
                  <a>{text}</a>
                </Link>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
