import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './BlogCard.module.css'

interface Props {
  post: any
}

const getProcessedUrl = (photo: any, rrggbb: any) => {
  if (
    photo &&
    photo.edition_options !== undefined &&
    photo.edition_options.crop_options
  ) {
    let myEditOption = photo.edition_options
    let post_edition_string =
      '&rect=' +
      Math.floor(myEditOption.crop_options.x) +
      ',' +
      Math.floor(myEditOption.crop_options.y) +
      ',' +
      Math.floor(myEditOption.crop_options.width) +
      ',' +
      Math.floor(myEditOption.crop_options.height) +
      '&fit=crop'
    return (
      photo.url.trim() +
      `?fm=jpg&w=1200&h=400&bri=-30&fit=crop&blend-color=${rrggbb ? rrggbb : '1e0245'
      }` +
      post_edition_string
    )
  } else if (photo && photo.url) {
    return (
      photo.url.trim() +
      `?fm=jpg&w=1200&h=400&bri=-30&fit=crop&blend-color=${rrggbb ? rrggbb : '1e0245'
      }`
    )
  } else {
    return photo.url
  }
}

const BlogCard: FC<Props> = (post: any) => {
  const { locale } = useRouter()
  const [currLocale, setLocale] = useState<string>(
    locale === 'pt' ? 'pt_PT' : 'en_US'
  )

  // Set locale to show product info in the correct language
  const currLocaleSplit: any = currLocale.split('_')
  const localeSplit: any = locale?.split('-')
  if (localeSplit[0] !== currLocaleSplit[0]) {
    setLocale(locale === 'pt' ? 'pt_PT' : 'en_US')
  }
  return (
    <div
      className="bg-center bg-cover bg-no-repeat mb-10"
      style={{
        backgroundImage: `url(${getProcessedUrl(post.photo, post.rrggbb)})`,
      }}
    >
      <Container>
        <div className={s.root}>
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {currLocale ? post.title[currLocale] : post.title.en_US}
          </h2>
          <div className="flex flex-col justify-between">
            <p className="mt-5 text-xl leading-7 text-accent-2 text-white">
              {currLocale ? post.intro[currLocale] : post.intro.en_US}
            </p>
            <Link href={`/post/${post.uri}`}>
              <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
                {locale === 'pt' ? 'Ler aqui' : 'Read it here'}
                <RightArrow width="20" heigh="20" className="ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BlogCard
