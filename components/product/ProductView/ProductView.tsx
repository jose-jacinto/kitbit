import { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { NextSeo, ProductJsonLd } from 'next-seo'

import WishlistButton from '@components/wishlist/WishlistButton'

import s from './ProductView.module.css'
import { useUI } from '@components/ui/context'
import { Swatch, ProductSlider } from '@components/product'
import { Button, Input, Text, Container } from '@components/ui'
import { HTMLContent } from '@components/core'

import { addToCart } from 'whitebrim'
import axios from 'axios'

interface Props {
  className?: string
  children?: any
  product: any
  urlVariant?: any
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

const ProductView: FC<Props> = ({ product, urlVariant }) => {
  const { locale } = useRouter()
  const { openSidebar, openModal, setModalView, user, setUser } = useUI()

  const [selectedMainVar, selectMainVar] = useState<any>(null)
  const [email, setEmail] = useState<any>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [currLocale, setLocale] = useState<string>(
    locale === 'pt' ? 'pt_PT' : 'en_US'
  )

  const [displayPrice, setPrice] = useState<any>(null)
  const [effect, setEffect] = useState<boolean>(false)

  const newText = locale === 'pt' ? 'NOVO!' : 'NEW!'
  const inStock = locale === 'pt' ? 'Em Stock' : 'In Stock'
  const outStock = locale === 'pt' ? 'Sem Stock' : 'Out of Stock'

  useEffect(() => {
    if (!displayPrice) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_WB_DOMAIN}/api/model/${process.env.NEXT_PUBLIC_WB_PROJECT_ID}/get_price?modelId[]=${product._id}`,
          localStorage.getItem('wb_token')
            ? {
              headers: {
                Authorization: localStorage.getItem('wb_token')
                  ? localStorage.getItem('wb_token')
                  : null,
              },
            }
            : {}
        )
        .then((response) => {
          if (!urlVariant) setPrice(response.data[0].productSpec.price)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('201854665067073')
        ReactPixel.track('ViewContent', {
          content_name: product.name,
          content_category:
            product.categories && product.categories.length > 0
              ? product.categories[0].name
              : '',
          content_ids: [product._id],
          content_type: 'product',
          value: product.price,
          currency: 'EUR',
          google_product_category: '3356',
        })
      })

    if (urlVariant && product.variant_options) {
      const variant = product.variant_options.find(
        (variant: any) => variant._id === urlVariant
      )
      if (variant.stock > 0) {
        selectMainVariant(variant)
      } else {
        selectMainVariant(product.variant_options[0])
      }
    } else if (product.variant_options.length > 0) {
      selectMainVariant(product.variant_options[0])
    }
  }, [product])

  const addItemToCart = () => {
    if (localStorage.getItem('wb_token')) {
      setLoading(true)
      let submitValues

      if (selectedMainVar && selectedMainVar._id) {
        submitValues = {
          addons: [],
          customizations: [],
          model_id: product._id,
          model_name: product.model_name,
          quantity: 1,
          variant: selectedMainVar._id, // SELECTED_VARIANT
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
              product.metaSpec.categoria ? product.metaSpec.categoria.code : '',
              product.productSpec.price,
              response.data.cart_item.quantity,
              'EUR'
            )

            let newUser = {
              ...user,
              cart: response.data.cart,
            }
            setUser(newUser)
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

  const selectMainVariant = (variant: any) => {
    if (variant) {
      window.history.pushState(
        null,
        '',
        `/product/${product.uri}?variant=${variant._id}`
      )
      setPrice(variant.price)
      selectMainVar(variant)
    }
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
      return photo.url.trim() + '?fm=jpg&w=1200&h=1200' + post_edition_string
    } else if (photo && photo.url) {
      return photo.url.trim() + '?fit=crop&fm=jpg&w=1200&h=1200'
    } else {
      return photo.url
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <ProductJsonLd
        productName={product.name}
        category="3356"
        images={[`https:${product.photo.url}`]}
        description={product.simpleDescription}
        brand={product.brands[0].name}
        offers={[
          {
            price: product.price,
            priceCurrency: 'EUR',
            itemCondition: 'https://schema.org/NewCondition',
            availability:
              product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            url: `https://kitbit.eu/product/${product.uri}`,
            seller: {
              name: 'Kitbit',
            },
          },
        ]}
        mpn={product.sku}
        sku={product.sku}
        productID={product._id}
      />
      <NextSeo
        title={product.name}
        description={
          product.simpleDescription
          // currLocale
          //   ? product.description[currLocale]
          //   : product.description.en_US
        }
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.simpleDescription,
          url: `https://kitbit.eu/product/${product.uri}`,
          // description: currLocale
          //   ? product.description[currLocale]
          //   : product.description.en_US,
          images: [
            {
              url: `https:${product.photo.url}`,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className={cn(s.root, 'fit')}>
        {/* className down here was mainElement */}
        <div className={cn(s.productDisplay, 'fit')}>

          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.discount[0] && product.discount[0].active ? (
                <>
                  <span>
                    <del>{product.price.toFixed(2)} €</del>
                  </span>
                  <span className="ml-5">
                    {product.discount[0].finalPrice.toFixed(2)} €{' '}
                    <span className="ml-4 text-kitbit">
                      {product.isNew && newText}
                    </span>
                  </span>
                </>
              ) : (
                <span>
                  {displayPrice && displayPrice.toFixed(2)} €{' '}
                  <span className="ml-4 text-kitbit">
                    {product.isNew && newText}
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className={s.sliderContainer}>
            <div className="absolute bottom-0 left-0 pr-16 max-w-full z-20">
              {product.stock <= 0 ? (
                <span
                  className={cn(s.productPrice2, 'text-kitbit', 'text-kitbit')}
                >
                  {outStock}
                </span>
              ) : (
                <span className={s.productPrice}>{inStock}</span>
              )}
            </div>
            <ProductSlider key={product._id}>
              {/* Main photo then gallery */}
              <div className={s.imageContainer}>
                <img
                  className={s.img}
                  src={getProcessedUrl(product.photo)}
                  alt={product.name}
                  width={1050}
                  height={1050}
                />
              </div>
              {product.gallery &&
                product.gallery.map((image: { url: string }, i: number) => (
                  <div key={image.url} className={s.imageContainer}>
                    <img
                      className={s.img}
                      src={getProcessedUrl(image)}
                      alt={product.name}
                      width={1050}
                      height={1050}
                    />
                  </div>
                ))}
            </ProductSlider>
          </div>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.variant_options.length > 0 && (
              <h1 className="font-bold mb-5">{locale === 'pt' ? 'Opções' : 'Options'}</h1>
            )}
            <div className="flex flex-wrap w-full">
              {product.variant_options.map((variant: any, i: number) => {
                return (
                  <div className="xl:w-1/3.5 lg:w-1/3 md:w-1/2 pb-4">
                    <Swatch
                      key={`${variant.name}-${i}`}
                      active={
                        selectedMainVar && selectedMainVar._id === variant._id
                      }
                      variant={'slim'}
                      label={`${variant.name}`}
                      price={variant.price}
                      onClick={() => selectMainVariant(variant)}
                      disabled={variant.stock <= 0}
                      outOfStock={variant.stock <= 0}
                      locale={locale}
                    />
                  </div>
                )
              })}
            </div>
            <div className="pb-14 break-words w-full max-w-xl">
              <h1 className="font-bold mb-5 mt-5">{locale === 'pt' ? 'Descrição' : 'Description'}</h1>
              <br />
              <HTMLContent html={product.description[currLocale]} className="blog-page" />
            </div>
          </section>
          <div>
            {product.stock > 0 ? (
              selectedMainVar ||
                (!selectedMainVar && product.variant_options.length === 0) ? (
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
              ) : null
            ) : (
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <Text className="heading">
                    {locale === 'pt'
                      ? 'Sem stock. Receba uma notificação quando estiver em stock'
                      : 'Out of Stock. Receive a notification when back in stock'}
                  </Text>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Input type="email" placeholder="Email" onChange={setEmail} />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Button
                    aria-label={
                      locale === 'pt' ? 'Alertar retoma de stock' : 'Notify me'
                    }
                    variant="slim"
                    type="button"
                    onClick={() => console.log('Notify')}
                    loading={loading}
                    disabled={loading}
                  >
                    {locale === 'pt' ? 'Alertar retoma de stock' : 'Notify me'}
                  </Button>
                </div>
              </div>
            )}
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
