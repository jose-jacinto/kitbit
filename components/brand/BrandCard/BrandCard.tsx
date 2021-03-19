import type { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import s from './BrandCard.module.css'

interface Props {
  className?: string
  brand: any
  variant?: 'slim' | 'simple'
  imgWidth: number | string
  imgHeight: number | string
  priority?: boolean
}

interface Photo {
  edition_options?: edition_options
  url: string
}

interface edition_options {
  crop_options: {
    x: number
    y: number
    width: number
    height: number
  }
}

const getProcessedUrl = (photo: Photo) => {
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
    return photo.url.trim() + '?fm=jpg&w=600&h=600' + post_edition_string
  } else if (photo && photo.url) {
    return photo.url.trim() + '?fit=crop&fm=jpg&w=600&h=600'
  } else {
    return photo.url
  }
}

const BrandCard: FC<Props> = ({
  className,
  brand,
  variant,
  imgWidth,
  imgHeight,
  priority,
}) => {
  return (
    <Link href={`/search?brand=${brand._id}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        <div className="relative overflow-hidden box-border">
          {/* <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
            <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
              {brand.name}
            </span>
          </div> */}
          <img
            src={getProcessedUrl(brand.photo)}
            alt={brand.name}
            width={imgWidth}
            height={imgHeight}
          />
        </div>
      </a>
    </Link>
  )
}

export default BrandCard
