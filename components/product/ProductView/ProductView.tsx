import { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo, ProductJsonLd } from 'next-seo'

import ReactPixel from 'react-facebook-pixel';

import s from './ProductView.module.css'
import { useUI } from '@components/ui/context'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Container } from '@components/ui'
import { HTMLContent } from '@components/core'
import WishlistButton from '@components/wishlist/WishlistButton'

import { getItemVariants } from '../helpers'

import { addToCart } from 'whitebrim'
import { getEnabledCategories } from 'trace_events'

interface Props {
  className?: string
  children?: any
  product: any
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

const ProductView: FC<Props> = ({ product }) => {
  const { locale } = useRouter()
  const { openSidebar, openModal, setModalView } = useUI()

  const variants = getItemVariants(product)
  const [selectedSize, selectSize] = useState<any>(null)

  const [colors, setColors] = useState<any>([])
  const [selectedColor, selectColor] = useState<any>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [currLocale, setLocale] = useState<string>(
    locale === 'pt' ? 'pt_PT' : 'en_US'
  )

  const [effect, setEffect] = useState<boolean>(false)

  useEffect(() => {
    if (!effect) {
      console.log(product)
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init('471210317253954');
          ReactPixel.track('ViewContent', {
            content_name: product.name,
            content_category: product.categories[0].name,
            content_ids: [product.sku],
            content_type: 'product',
            value: product.price,
            currency: 'EUR',
            google_product_category: product.categories[0].name,
          });
        });


      setEffect(true)
    }
  }, [])

  const addItemToCart = () => {
    if (localStorage.getItem('wb_token')) {
      setLoading(true)
      let submitValues

      if (
        (selectedSize && selectedSize[0].variant_id && selectedColor) ||
        (selectedSize && selectedSize[0].variant_id && !selectedColor)
      ) {
        submitValues = {
          addons: [],
          customizations: [],
          model_id: product._id,
          model_name: product.model_name,
          quantity: 1,
          // If color use color id else use size id
          variant: !selectedColor
            ? selectedSize[0].variant_id
            : selectedColor.variant_id, // SELECTED_VARIANT
          //
          userId: localStorage.getItem('wb_userId'), // USER ID
        }
      } else {
        submitValues = {
          addons: [],
          customizations: [],
          model_id: product._id,
          model_name: product.model_name,
          quantity: 1,
          userId: localStorage.getItem('wb_userId'), // USER ID
        }
      }

      addToCart(submitValues)
        .then((response) => {
          if (response.status === 200) {
            const product = response.data.cartItemModel
            window.snowplow(
              'trackAddToCart',
              product.productSpec.sku,
              product.name,
              product.metaSpec.categoria.code,
              product.productSpec.price,
              response.data.cart_item.quantity,
              'EUR'
            )

            openSidebar()
            setLoading(false)
          } else if (response.status === 304) {
            setLoading(false)
          }
        })
        .catch((err) => {
          if (err && err.response && err.response.status === 304) {
            setLoading(false)
          } else {
            setLoading(false)
          }
        })
    } else {
      setModalView('LOGIN_VIEW')
      return openModal()
    }
  }

  const selectMainVariant = (key: any) => {
    selectColor(null)

    variants[key].size_name = key
    selectSize(variants[key])

    if (variants[key][0].option_name) {
      setColors(variants[key])
    } else {
      setColors([])
    }
  }

  const selectMainColor = (color: object) => {
    selectColor(color)
  }

  // Set locale to show product info in the correct language
  const currLocaleSplit: any = currLocale.split('_')
  const localeSplit: any = locale?.split('-')
  if (localeSplit[0] !== currLocaleSplit[0]) {
    setLocale(locale === 'pt' ? 'pt_PT' : 'en_US')
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
      return photo.url.trim() + '?fm=jpg&w=600&h=600'
    } else {
      return photo.url
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <ProductJsonLd
        productName={product.name}
        images={[
          product.photo.url
        ]}
        description="Unavailable"
        brand={product.brands[0].name}
        offers={[
          {
            price: product.price,
            priceCurrency: 'EUR',
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            url: `https://kitbit.vercel.app/product/${product.uri}`,
            seller: {
              name: 'Kitbit',
            },
          },
        ]}
        mpn={product.sku}
        sku={product.sku}

      />
      <NextSeo
        title={product.name}
        description={
          currLocale
            ? product.description[currLocale]
            : product.description.en_US
        }
        openGraph={{
          type: 'website',
          title: product.name,
          description: currLocale
            ? product.description[currLocale]
            : product.description.en_US,
          images: [
            {
              url: product.photo.url,
              // product.photo.url.split(':')[0] !== 'https'
              //   ? `https://${product.photo.url}`
              //   : `${product.photo.url}`,
              width: 800,
              height: 600,
              alt: product.name,
            }
          ]
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.price.toFixed(2)}
              {` `}€
            </div>
          </div>

          <div className={s.sliderContainer}>
            <ProductSlider>
              {/* Main photo then gallery */}
              <div key={product.photo.url} className={s.imageContainer}>
                <img
                  className={s.img}
                  src={getProcessedUrl(product.photo)}
                  alt={product.name}
                  width={1050}
                  height={1050}
                // priority={true}
                // quality="85"
                />
              </div>
              {product.gallery &&
                product.gallery.map((image: { url: string }, i: number) => (
                  <div key={image.url} className={s.imageContainer}>
                    <img
                      className={s.img}
                      src={getProcessedUrl(image)}
                      alt={'Product Image'}
                      width={1050}
                      height={1050}
                    // priority={false}
                    // quality="85"
                    />
                  </div>
                ))}
            </ProductSlider>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            <div className="pb-4">
              {Object.keys(variants).length > 0 && (
                <h2 className="uppercase font-medium">Size</h2>
              )}
              <div className="flex flex-row py-4">
                {Object.keys(variants).map((key: any, i: number) => {
                  return (
                    <Swatch
                      key={`${key}-${i}`}
                      active={selectedSize && selectedSize.size_name === key}
                      variant={'slim'}
                      color={''}
                      label={`${key}`}
                      onClick={() => selectMainVariant(key)}
                    />
                  )
                })}
              </div>
            </div>
            <div className="pb-4">
              {colors.length > 0 && (
                <h2 className="uppercase font-medium">Color</h2>
              )}
              <div className="flex flex-row py-4">
                {colors.map((color: any, i: number) => {
                  return (
                    <Swatch
                      key={`${color._id}-${i}`}
                      active={selectedColor && selectedColor._id === color._id}
                      variant={'slim'}
                      color={color.options_name}
                      label={color.option_name}
                      onClick={() => selectMainColor(color)}
                    />
                  )
                })}
              </div>
            </div>
            <div className="pb-14 break-words w-full max-w-xl">
              <HTMLContent html={product.description[currLocale]} />
            </div>
          </section>
          <div>
            {(selectedSize && !selectedSize[0]._id) ||
              (selectedSize && selectedSize[0]._id && selectedColor) ||
              Object.keys(variants).length === 0 ? (
                <Button
                  aria-label="Add to Cart"
                  type="button"
                  className={s.button}
                  onClick={addItemToCart}
                  loading={loading}
                  disabled={loading} // if (no variant selected and variantLength > 0)
                >
                  {locale === 'pt' ? 'Adicionar ao Carrinho' : 'Add to Cart'}
                </Button>
              ) : null}
          </div>
        </div>

        <WishlistButton
          className={s.wishlistButton}
          productId={product.entityId}
          variant={null}
        />
      </div>
    </Container>
  )
}

export default ProductView
