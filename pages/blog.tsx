import type { GetStaticPropsContext } from 'next'
import { Layout } from '@components/core'
import { Container, Hero } from '@components/ui'
import { BlogCard } from '@components/blog'

import { getItems } from 'whitebrim'

const fetchItems = async (data: { modelName: string }) => {
  let params = {
    modelName: data.modelName,
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
  let blogData = {
    modelName: 'blog',
  }

  const { items: blog } = await fetchItems(blogData)

  return {
    props: {
      blog,
    },
    revalidate: 10,
  }
}

export default function Blog({ blog }: any) {
  return (
    <Container>
      <div className="text-center pt-40 pb-56 bg-violet mb-10 mt-5">
        <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
          Blogerino
        </h2>
      </div>
      {blog.map((post: any, index: number) => (
        <BlogCard {...post} />
      ))}
    </Container>
  )
}

Blog.Layout = Layout
