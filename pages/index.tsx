import type { GetStaticPropsContext } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout, HomeAllProductsGrid } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import { useUI } from '@components/ui/context'
import { BrandCard } from '@components/brand'

import { getItems } from 'whitebrim'

const fetchItems = async (data: {
  modelName: string
  filter?: object
  currentPage?: number
  selectedPageSize?: number
}) => {
  let params = {
    modelName: data.modelName,
    filters: data.filter,
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

export async function getStaticProps({ }: GetStaticPropsContext) {
  let highlightItems = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 3,
    filter: {
      type: 'highlight',
      order_by: 'type_highlight',
      order: 'asc',
    },
  }
  let recentItems = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 3,
    filter: {
      type: 'recent',
      order_by: 'type_recent',
      order: 'asc',
    },
  }
  let items = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 150,
  }

  const { items: highlightProducts } = await fetchItems(highlightItems)
  const { items: recentProducts } = await fetchItems(recentItems)
  const { items: products } = await fetchItems(items)

  const { items: categories } = await fetchItems({
    modelName: 'categories',
    filter: {},
    currentPage: 1,
    selectedPageSize: 150,
  })
  const { items: brands } = await fetchItems({
    modelName: 'brands',
    filter: {},
    currentPage: 1,
    selectedPageSize: 150,
  })

  return {
    props: {
      highlightProducts,
      recentProducts,
      products,
      categories,
      brands,
    },
    revalidate: 10,
  }
}

export default function Home({
  highlightProducts,
  recentProducts,
  products,
  categories,
  brands,
}: any) {
  const { query, locale } = useRouter()
  const { setModalView, openModal } = useUI()

  useEffect(() => {
    if (query.req_link_param && query.rel_usr) {
      setModalView('FORGOT_VIEW')
      return openModal()
    }
    if (query.t === 'recover') {
      setModalView('FORGOT_VIEW')
      return openModal()
    }
  }, [query.req_link_param, query.rel_usr, query.t])

  return (
    <div>
      <Grid>
        {highlightProducts.map((item: any, i: number) => (
          <ProductCard
            key={item._id}
            product={item}
            // The first image is the largest one in the grid
            imgWidth={i === 0 ? 1600 : 820}
            imgHeight={i === 0 ? 1600 : 820}
            priority
            locale={locale}
          />
        ))}
      </Grid>
      <Hero
        headline="Kitbit - One-stop shop for the modern explorer"
        description="We gather hand-picked boards and electronic products from all around the globe and combine them into kits ready to be assembled and tinkered with."
      />
      <Grid layout="normal">
        {recentProducts.map((item: any, i: number) => (
          <ProductCard
            key={item._id}
            product={item}
            variant="simple"
            imgWidth={480}
            imgHeight={480}
            // The second image is the largest one in the grid
            // imgWidth={i === 1 ? 1600 : 820}
            // imgHeight={i === 1 ? 1600 : 820}
            locale={locale}
          />
        ))}
      </Grid>
      <Marquee>
        {brands.map((item: any, i: number) => (
          <BrandCard
            key={item._id}
            brand={item}
            imgWidth={360}
            imgHeight={480}
          />
        ))}
      </Marquee>
      <HomeAllProductsGrid
        categories={categories ? categories : []}
        brands={brands ? brands : []}
        products={products ? products : []}
      />
    </div>
  )
}

Home.Layout = Layout
