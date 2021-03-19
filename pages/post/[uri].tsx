import type { GetStaticPathsContext, GetStaticPropsContext } from 'next'

import { NextSeo, ArticleJsonLd } from 'next-seo'

import { Layout, HTMLContent } from '@components/core'
import { Container } from '@components/ui'

import { getItems, getItemByUri } from 'whitebrim'

const getAllModels = async (data: { modelName: string }) => {
  return getItems({ modelName: data.modelName })
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
  return getItemByUri({
    modelName: 'blog',
    uri: uri,
  })
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
}: GetStaticPropsContext<{ uri: string }>) {
  const data = await getItem(params && params.uri)

  if (!data) {
    throw new Error(`Post with uri '${params!.uri}' not found`)
  }

  return {
    props: data,
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const data = await getAllModels({ modelName: 'blog' })
  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a post path for every locale
          data.items.forEach((post: { uri: string }) => {
            arr.push(`/${locale}/post/${post.uri}`)
          })
          return arr
        }, [])
      : data.items.forEach((post: { uri: any }) => `/post/${post.uri}`),
    // If your store has tons of posts, enable fallback mode to improve build times!
    fallback: false,
  }
}

export default function Post({ item }: any) {
  return (
    <div className="pb-20">
      <ArticleJsonLd
        url={`https://kitbit.vercel.app/post/${item.uri}`}
        title={item.title}
        images={[item.photo.url]}
        datePublished={item.creat_default.createdAt}
        dateModified={
          item.edit_default && item.edit_default.createdAt
            ? item.edit_default.createdAt
            : ''
        }
        authorName={['Kitbit']}
        publisherName="Kitbit"
        publisherLogo={`https://kitbit.vercel.app/post/${item.uri}`}
        description={item.intro}
      />
      <NextSeo
        title={item.title}
        description={item.intro}
        openGraph={{
          type: 'website',
          title: item.name,
          description: item.intro,
          images: [
            {
              url: `https:${item.photo.url}`,
              width: 800,
              height: 600,
              alt: item.name,
            },
          ],
        }}
      />
      <div className="text-center pt-40 pb-56 bg-violet">
        <Container>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            {item.title}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {item.intro}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="flex">
              <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://vercel.com/api/www/avatar/61182a9f6bda512b4d9263c9c8a60aabe0402f4c?s=204"
                  alt="Avatar"
                />
              </div>
              <div className="ml-4">
                <div className="leading-6 font-medium text-white">
                  José Rodriguez
                </div>
                <div className="leading-6 font-medium text-gray-200">
                  CEO, Acme
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <HTMLContent html={item.html} />
        </div>
      </Container>
    </div>
  )
}

Post.Layout = Layout
