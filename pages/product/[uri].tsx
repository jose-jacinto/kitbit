import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'

import { Layout } from '@components/core'
import { ProductView } from '@components/product'

import { getItems, getItemByUri } from 'whitebrim'

const getAllModels = async (data: {
  modelName: string
  currentPage: number
  selectedPageSize: number
}) => {
  let params = {
    modelName: data.modelName,
    filters: {},
    pagination: {
      page: data.currentPage,
      limit: data.selectedPageSize,
    },
  }

  return getItems(params)
    .then((res: { data: { results: []; total_pages: number } }) => ({
      items: res.data.results,
      totalPages: res.data.total_pages,
      error: false,
    }))
    .catch((err: object) => ({
      items: [],
      totalPages: 0,
      error: true,
    }))
}

const getItem = async (uri: any) => {
  return getItemByUri({ modelName: 'product', uri: uri })
    .then((res) => ({
      item: res.data,
      error: false,
    }))
    .catch(() => ({
      item: null,
      error: true,
    }))
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ uri: string; variant?: any }>) {
  const data = await getItem(params && params.uri)

  if (!data) {
    throw new Error(`Product with uri '${params!.uri}' not found`)
  }

  return {
    props: data,
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const data = await getAllModels({
    modelName: 'product',
    currentPage: 1,
    selectedPageSize: 150,
  })

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          data.items.forEach((product: { uri: string }) => {
            arr.push(`/${locale}/product/${product.uri}`)
          })
          return arr
        }, [])
      : data.items.forEach(
          (product: { uri: any }) => `/product/${product.uri}`
        ),
    // If your store has tons of products, enable fallback mode to improve build times!
    fallback: false,
  }
}

export default function Uri({
  item,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const param = router.asPath.match(new RegExp(`[&?]${'variant'}=(.*)(&|$)`))

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <ProductView
      product={item}
      urlVariant={param && param[1] ? param[1] : null}
    />
  )
}

Uri.Layout = Layout
