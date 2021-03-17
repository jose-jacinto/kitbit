import type { GetStaticPropsContext } from 'next'
import { Layout } from '@components/core'
import { Container } from '@components/ui'
import { BlogCard } from '@components/blog'

import { getItems } from 'whitebrim'

const fetchItems = async (data: { modelName: string }) => {
  return getItems({ modelName: data.modelName })
    .then((res) => ({
      items: res.data.results,
      error: false,
    }))
    .catch(() => ({
      items: null,
      error: true,
    }))
}

export async function getStaticProps({}: GetStaticPropsContext) {
  const { items: blog } = await fetchItems({ modelName: 'blog' })
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
          Blog
        </h2>
      </div>
      {blog.map((post: any, index: number) => (
        <BlogCard key={index} {...post} />
      ))}
    </Container>
  )
}

Blog.Layout = Layout
