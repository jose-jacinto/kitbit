import { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'

import { UserNav } from '@components/core'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { useUI } from '@components/ui/context'

import CartItem from '../CartItem'
import s from './CartSidebarView.module.css'

import { goToCheckoutPage } from 'whitebrim'

const CartSidebarView: FC = () => {
  const { locale } = useRouter()

  const { closeSidebar, user, setUser } = useUI()
  const handleClose = () => closeSidebar()

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
    <div
      className={cn(s.root, {
        [s.empty]: null,
        [s.empty]: null,
        [s.empty]: !user || (user && user.cart.length === 0),
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav className="" />
          </div>
        </div>
      </header>

      {!user || (user && user.cart.length === 0) ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            {locale === 'pt' ? 'O carrinho está vazio' : 'Your cart is empty'}
          </h2>
          {/* <p className="text-accents-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p> */}
        </div>
      ) : false ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            {locale === 'pt'
              ? 'We couldn’t process the purchase. Please check your card information and try again.'
              : 'Não foi possível processar a compra. Por favor, verifique as informações do seu cartão e tente novamente.'}
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
              : 'Thank you for your order'}
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <h2 className="pt-1 pb-4 text-2xl leading-7 font-bold text-base tracking-wide">
              {locale === 'pt' ? 'Meu Carrinho' : 'My Cart'}
            </h2>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
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
          </div>

          <div className="flex-shrink-0 px-4  py-5 sm:px-6">
            <div className="border-t border-accents-3">
              <ul className="py-3">
                <li className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>{subTotal.toFixed(2)} €</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>
                    {locale === 'pt' ? 'Portes de Envio' : 'Estimated Shipping'}
                  </span>
                  <span className="font-bold tracking-wide">0.00 €</span>
                </li>
              </ul>
              <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
                <span>Total</span>
                <span>{subTotal.toFixed(2)} €</span>
              </div>
            </div>
            <Button onClick={() => goToCheckout()} Component="a" width="100%">
              {locale === 'pt' ? 'Ir para o checkout' : 'Proceed to Checkout'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
