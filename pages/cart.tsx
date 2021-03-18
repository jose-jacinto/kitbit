import { useState } from 'react'

import { Layout } from '@components/core'
import { Button, LoadingDots } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { CartItem } from '@components/cart'
import { Input, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { useRouter } from 'next/router'

import { applyPromoCode, removePromoCode, goToCheckoutPage } from 'whitebrim'

export default function Cart() {
  const { locale } = useRouter()
  const { user, setUser } = useUI()

  const couponText = locale === 'pt' ? 'Adicionar' : 'Add'

  const [coupon, setCoupon] = useState<any>('')
  const [loadingCoupon, setLoadingCoupon] = useState<any>(false)
  const [couponMessage, setCouponMessage] = useState<any>(null)

  const addCoupon = () => {
    setLoadingCoupon(true)
    applyPromoCode(coupon)
      .then((response: any) => {
        setLoadingCoupon(false)

        if (response && response.status !== 204) {
          setCouponMessage(locale === 'pt' ? 'Adicionado' : 'Added')
          setTimeout(() => {
            setCouponMessage(null)
          }, 2500)
          setUser(response.data)
        } else {
          setCouponMessage(locale === 'pt' ? 'Não encontrado' : 'Not found')
          setTimeout(() => {
            setCouponMessage(null)
          }, 2500)
        }
      })
      .catch((err: any) => {
        setLoadingCoupon(false)
        setCouponMessage(locale === 'pt' ? 'Erro' : 'Error')
        setTimeout(() => {
          setCouponMessage(null)
        }, 2500)
      })
  }

  const removeCoupon = () => {
    removePromoCode()
      .then((response: any) => {
        if (response && response.status !== 204) {
          console.log(response)
          setUser(response.data)
        } else {
          console.log(response)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const goToCheckout = () => {
    goToCheckoutPage()
      .then((response) => {
        window.location.replace(
          `/checkout/?linkRef=${response.data.linkRef}&deploymentId=${process.env.NEXT_PUBLIC_WB_DEPLOYMENT_ID}`
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let subTotal = 0
  if (user) {
    user.cart.forEach((cartItem: any) => {
      if (cartItem.discount && cartItem.discount.active) {
        subTotal += cartItem.discount.finalPrice
      } else if (!cartItem.discount || !cartItem.discount.active) {
        subTotal += cartItem.price * cartItem.quantity
      }
    })
  }

  return (
    <div className="grid lg:grid-cols-12">
      <div className="lg:col-span-8">
        {user && user.cart.length === 0 ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              {locale === 'pt' ? 'O carrinho está vazio' : 'Your cart is empty'}
            </h2>
          </div>
        ) : false ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              {locale === 'pt'
                ? 'Não foi possível processar a compra. Por favor, verifique o seu cartão informações e tente novamente.'
                : 'We couldn’t process the purchase. Please check your card information and try again.'}
            </h2>
          </div>
        ) : false ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              {locale === 'pt'
                ? 'Obrigado pela sua encomenda.'
                : 'Thank you for your order.'}
            </h2>
          </div>
        ) : (
          <div className="px-4 sm:px-6 flex-1">
            <Text variant="pageHeading">
              {locale === 'pt' ? 'Carrinho' : 'My Cart'}
            </Text>
            <Text variant="sectionHeading">
              {locale === 'pt'
                ? 'Confirme a sua encomenda'
                : 'Review your Order'}
            </Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
              {user &&
                user.cart.map((item: any) => (
                  <CartItem
                    user={user}
                    setUser={setUser}
                    key={item.id}
                    item={item}
                    currencyCode={'€'}
                  />
                ))}
            </ul>
            <div className="my-6">
              <Text>
                Before you leave, take a look at these items. We picked them
                just for you
              </Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div className="border border-accents-3 w-full h-24 bg-accents-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6">
          <div>
            <div className="flex justify-between border-b border-accents-2 py-3 font-bold mb-10">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <h3>{locale === 'pt' ? 'Apply Coupon' : 'Aplicar Cupão'}</h3>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    type="text"
                    id="coupon"
                    name="coupon"
                    placeholder={'****'}
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Button
                    variant="slim"
                    onClick={() => addCoupon()}
                    disabled={loadingCoupon || couponMessage}
                  >
                    {loadingCoupon ? (
                      <LoadingDots className="bg-white" />
                    ) : couponMessage ? (
                      couponMessage
                    ) : (
                      couponText
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal.toFixed(2)} €</span>
              </li>
              <li className="flex justify-between py-1">
                <span>
                  {locale === 'pt' ? 'Portes de Envio' : 'Estimated Shipping'}
                </span>
                <span>
                  {locale === 'pt'
                    ? 'Opções de envio disponíveis no checkout'
                    : 'Shipping options at checkout'}
                </span>
                <span className="font-bold tracking-wide">0.00 €</span>
              </li>
              {user &&
                user.cartExtraData &&
                user.cartExtraData.promoRow.map((promo: any) => (
                  <li className="flex justify-between py-1" key={promo._id}>
                    <span>{promo.title}</span>
                    <a
                      className="hover:underline cursor-pointer"
                      onClick={() => removeCoupon()}
                    >
                      {locale === 'pt' ? 'Remover' : 'Remove'}
                    </a>
                  </li>
                ))}
            </ul>
            <div className="flex justify-between border-t border-accents-2 py-3 font-bold mb-10">
              <span>Total</span>
              <span>{subTotal.toFixed(2)} €</span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="w-full lg:w-72">
              {user && user.cart.length === 0 ? (
                <Button href="/" Component="a" width="100%">
                  {locale === 'pt'
                    ? 'Continuar a comprar'
                    : 'Continue Shopping'}
                </Button>
              ) : (
                <Button
                  onClick={() => goToCheckout()}
                  Component="a"
                  width="100%"
                >
                  {locale === 'pt'
                    ? 'Ir para o checkout'
                    : 'Proceed to Checkout'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Cart.Layout = Layout
