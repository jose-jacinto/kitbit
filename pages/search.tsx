import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { Layout } from '@components/core'
import { ProductCard } from '@components/product'
import { Container, Grid, Skeleton, InfiniteScroll } from '@components/ui'

import rangeMap from '@lib/range-map'

import { getItems } from 'whitebrim'

const fetchItems = (data: {
  modelName: string
  filter?: object
  currentPage?: number
  selectedPageSize?: number
}) => {
  let wbParams = {
    modelName: data.modelName,
    filters: data.filter,
    pagination: {
      page: data.currentPage,
      limit: data.selectedPageSize,
    },
  }

  return getItems(wbParams)
    .then((res) => ({
      items: res.data.results,
      total_results: res.data.total_results,
      total_pages: res.data.total_pages,
      limit: res.data.limit,
      page: res.data.page,
      error: false,
    }))
    .catch(() => ({
      items: null,
      total_results: 0,
      total_pages: 0,
      limit: 0,
      page: 0,
      error: true,
    }))
}

export async function getStaticProps({}: GetStaticPropsContext) {
  let categoriesItems = {
    modelName: 'categories',
    filter: {},
    currentPage: 1,
    selectedPageSize: 150,
  }
  let brandItems = {
    modelName: 'brands',
    filter: {},
    currentPage: 1,
    selectedPageSize: 150,
  }

  const { items: categories } = await fetchItems(categoriesItems)
  const { items: brands } = await fetchItems(brandItems)

  return {
    props: {
      categories,
      brands,
    },
  }
}

export default function Search({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { q, cat, brand }: any = router.query

  const [page, setPage] = useState<number>(1)

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let filter: any = {}

    if (q) filter['q'] = q
    if (cat) filter['categories'] = cat
    if (brand) filter['brands'] = brand._id ? brand._id : brand

    let payload = {
      modelName: 'product',
      currentPage: page,
      selectedPageSize: 6,
      filter: filter,
    }

    fetchItems(payload)
      .then((res) => {
        if (data && page !== 1) res.items = [...data.items, ...res.items]
        setData(res)
      })
      .catch((error) => {
        setData(null)
      })

    return () => {
      console.log('Effect ended')
    }
  }, [page, q, cat, brand])

  const leNext = () => {
    setPage(data.page + 1)
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
                  setPage(1)
                }}
              >
                {router.locale === 'pt'
                  ? 'Todas as Categorias'
                  : 'All Categories'}
              </a>
            </li>
            {categories.map((category: any) => (
              <li
                key={category._id}
                className={cn('py-1 text-accents-8', {
                  underline: cat === category._id,
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
                    setPage(1)
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
                  setPage(1)
                }}
              >
                {router.locale === 'pt' ? 'Todas as Marcas' : 'All Brands'}
              </a>
            </li>
            {brands.flatMap((brand: any) => (
              <li
                key={brand.path}
                className={cn('py-1 text-accents-8', {
                  underline: router.query && router.query.brand === brand._id,
                })}
              >
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault()

                    router.push(
                      {
                        pathname: `/search`,
                        query: brand && brand._id ? { brand: brand._id } : {},
                      },
                      undefined,
                      { shallow: true }
                    )
                    setPage(1)
                  }}
                >
                  {brand.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-8">
          {q && (
            <div className="mb-12 transition ease-in duration-75">
              {data ? (
                <>
                  <span
                    className={cn('animated', {
                      fadeIn: data,
                      hidden: !data,
                    })}
                  >
                    {router.locale === 'pt' ? 'A mostrar' : 'Showing'}{' '}
                    {data.items.length}{' '}
                    {router.locale === 'pt' ? 'resultados' : 'results'}{' '}
                    {q && (
                      <>
                        {router.locale === 'pt' ? 'para' : 'for'} "
                        <strong>{q}</strong>"
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
                        {router.locale === 'pt'
                          ? 'Não há produtos que correspondam'
                          : 'There are no products that match'}{' '}
                        "<strong>{q}</strong>"
                      </>
                    ) : (
                      <>
                        {router.locale === 'pt'
                          ? 'Não há produtos que correspondam à categoria e marca selecionadas'
                          : 'There are no products that match the selected category & brand'}
                      </>
                    )}
                  </span>
                </>
              ) : q ? (
                <>
                  {router.locale === 'pt' ? 'A procurar por' : 'Searching for'}:
                  "<strong>{q}</strong>"
                </>
              ) : (
                <>{router.locale === 'pt' ? 'A procurar' : 'Searching'}...</>
              )}
            </div>
          )}
          {data ? (
            <InfiniteScroll
              layout="normal"
              dataLength={data.items.length}
              next={leNext}
              hasMore={data.total_pages > data.page}
              locale={router.locale}
            >
              {data.items.map((item: any) => (
                <ProductCard
                  variant="simple"
                  key={item.uri}
                  className="flex flex-1 animated fadeIn"
                  product={item}
                  imgWidth={480}
                  imgHeight={480}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <Grid layout="normal">
              {rangeMap(6, (i) => (
                <Skeleton
                  key={i}
                  className="w-full animated fadeIn"
                  height={325}
                />
              ))}
            </Grid>
          )}
        </div>
      </div>
      {/* <div className="col-span-2">
        <ul>
          <li className="py-1 text-base font-bold tracking-wide">Sort</li>
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
          ))}
        </ul>
      </div> */}
    </Container>
  )
}

Search.Layout = Layout
