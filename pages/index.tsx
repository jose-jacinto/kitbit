import { useMemo } from 'react'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import rangeMap from '@lib/range-map'

import { Layout } from '@components/core'
import { Grid, Marquee, Hero } from '@components/ui'
import { ProductCard } from '@components/product'
import HomeAllProductsGrid from '@components/core/HomeAllProductsGrid'

import { getItems } from 'whitebrim'

const fetchItems = async (data: {
  modelName: string
  currentPage: number
  selectedPageSize: number
  filterOption: {
    name: any
    id: any
  }
  filterOption2: {
    name: any
    id: any
  }
  multi?: boolean
}) => {
  let filter: any = {}

  if (data.filterOption && data.filterOption.name && data.filterOption.id) {
    filter[data.filterOption.name] = data.filterOption.id
  }

  if (data.filterOption2 && data.filterOption2.name && data.filterOption2.id) {
    filter[data.filterOption2.name] = data.filterOption2.id
  }

  let params = {
    modelName: data.modelName,
    filters: filter,
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
  let featuredItems = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 6,
    filterOption: { name: 'isFeatured', id: true },
    filterOption2: { name: null, id: null },
    multi: false,
  }
  let bestSellingItems = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 6,
    filterOption: { name: 'isBestSelling', id: true },
    filterOption2: { name: null, id: null },
    multi: false,
  }
  let newestItems = {
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 6,
    filterOption: { name: 'order_by', id: 'createdAt' },
    filterOption2: { name: 'order', id: 'asc' },
    multi: true,
  }

  const { items: featuredProducts } = await fetchItems(featuredItems)
  const { items: bestSellingProducts } = await fetchItems(bestSellingItems)
  const { items: newestProducts } = await fetchItems(newestItems)

  let categoriesItems = {
    modelName: 'categories',
    currentPage: 1,
    selectedPageSize: 6,
    filterOption: { name: null, id: null },
    filterOption2: { name: null, id: null },
    multi: false,
  }
  let brandItems = {
    modelName: 'brands',
    currentPage: 1,
    selectedPageSize: 6,
    filterOption: { name: null, id: null },
    filterOption2: { name: null, id: null },
    multi: false,
  }

  const { items: categories } = await fetchItems(categoriesItems)
  const { items: brands } = await fetchItems(brandItems)

  return {
    props: {
      featuredProducts,
      bestSellingProducts,
      newestProducts,
      categories,
      brands,
    },
    revalidate: 10,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featuredProducts,
  bestSellingProducts,
  newestProducts,
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { featured, bestSelling } = useMemo(() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.price - b.price)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  }, [newestProducts, featuredProducts, bestSellingProducts])

  return (
    <div>
      <Grid>
        {featured.slice(0, 3).map((item, i) => (
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
      <Marquee variant="secondary">
        {bestSelling.slice(3, 6).map((item, i) => (
          <ProductCard
            key={item._id}
            product={item}
            variant="slim"
            imgWidth={320}
            imgHeight={320}
          />
        ))}
      </Marquee>
      <Hero
        headline="Kitbit - One-stop shop for the modern explorer"
        description="Domephgt"
      />
      <Grid layout="B">
        {featured.slice(3, 6).map((item, i) => (
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
        {bestSelling.slice(0, 3).map((item, i) => (
          <ProductCard
            key={item._id}
            product={item}
            variant="slim"
            imgWidth={360}
            imgHeight={480}
          />
        ))}
      </Marquee>
      <HomeAllProductsGrid
        categories={categories ? categories : []}
        brands={brands ? brands : []}
        newestProducts={newestProducts}
      />
    </div>
  )
}

Home.Layout = Layout
