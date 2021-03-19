import type { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import s from './ProductCard.module.css'

import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  product: any
  variant?: 'slim' | 'simple'
  imgWidth: number | string
  imgHeight: number | string
  priority?: boolean
  locale?: any
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
    return photo.url.trim() + '?fm=jpg&w=1200&h=1200' + post_edition_string
  } else if (photo && photo.url) {
    return photo.url.trim() + '?fit=crop&fm=jpg&w=1200&h=1200'
  } else {
    return photo.url
  }
}

const ProductCard: FC<Props> = ({
  className,
  product: p,
  variant,
  imgWidth,
  imgHeight,
  priority,
  locale,
}) => {
  const newText = locale === 'pt' ? 'NOVO!' : 'NEW!'
  const inStock = locale === 'pt' ? 'Em Stock!' : 'In Stock!'
  const outStock = locale === 'pt' ? 'Sem Stock!' : 'Out of Stock!'

  return (
    <Link href={`/product/${p.uri}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.name}
              </span>
            </div>
            <img
              src={getProcessedUrl(p.photo)}
              alt={p.name}
              width={imgWidth}
              height={imgHeight}
              // priority={priority}
              // quality="85"
              // loader={getProcessedUrl(p.photo)}
            />
          </div>
        ) : (
          <>
            <div className="absolute bottom-0 left-0 pr-16 max-w-full z-20">
              {p.stock <= 0 ? (
                <span className={s.productPrice}>{outStock}</span>
              ) : (
                <span className={s.productPrice}>{inStock}</span>
              )}
            </div>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{p.name}</span>
                </h3>
                {p.discount[0] && p.discount[0].active ? (
                  <span className={s.productPrice}>
                    <del>{p.price.toFixed(2)} €</del>
                    <span className="ml-5">
                      {p.discount[0].finalPrice.toFixed(2)} €{' '}
                      <span className="ml-4 text-kitbit">
                        {p.isNew && newText}
                      </span>
                    </span>
                  </span>
                ) : (
                  <span className={s.productPrice}>
                    {p.price.toFixed(2)} €{' '}
                    <span className="ml-4 text-kitbit">
                      {p.isNew && newText}
                    </span>
                  </span>
                )}
              </div>
              <WishlistButton
                className={s.wishlistButton}
                productId={p._id}
                variant={null}
              />
            </div>
            <div className={s.imageContainer}>
              <img
                alt={p.name}
                className={cn('w-full object-cover', s['product-image'])}
                src={getProcessedUrl(p.photo)}
                width={imgWidth}
                height={imgHeight}
                // priority={priority}
                // quality="85"
                // loader={getProcessedUrl(p.photo)}
              />
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
