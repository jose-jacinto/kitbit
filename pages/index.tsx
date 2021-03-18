import type { GetStaticPropsContext } from 'next'

import { Layout, HomeAllProductsGrid } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
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
    filter: { name: 'type', id: 'highlight' },
  }
  let recentItems = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 3,
    filter: { name: 'type', id: 'recent' },
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
          />
        ))}
      </Grid>
      <Hero
        headline="Kitbit - One-stop shop for the modern explorer"
        description="We gather hand-picked boards and electronic products from all around the globe and combine them into kits ready to be assembled and tinkered with."
      />
      <Grid layout="B">
        {recentProducts.map((item: any, i: number) => (
          <ProductCard
            key={item._id}
            product={item}
            // The second image is the largest one in the grid
            imgWidth={i === 1 ? 1600 : 820}
            imgHeight={i === 1 ? 1600 : 820}
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
