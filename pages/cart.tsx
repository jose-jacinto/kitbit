import { Layout } from '@components/core'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { CartItem } from '@components/cart'
import { Text } from '@components/ui'
import { useUI } from '@components/ui/context'

import { goToCheckoutPage } from 'whitebrim'

export default function Cart() {
  const { user, setUser } = useUI()

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
              Your cart is empty
            </h2>
            <p className="text-accents-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : false ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn’t process the purchase. Please check your card
              information and try again.
            </h2>
          </div>
        ) : false ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Thank you for your order.
            </h2>
          </div>
        ) : (
          <div className="px-4 sm:px-6 flex-1">
            <Text variant="pageHeading">My Cart</Text>
            <Text variant="sectionHeading">Review your Order</Text>
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
          <div className="border-t border-accents-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal.toFixed(2)} €</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Estimated Shipping</span>
                <span>Shipping options at checkout</span>
                <span className="font-bold tracking-wide">0.00 €</span>
              </li>
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
                  Continue Shopping
                </Button>
              ) : (
                <Button
                  onClick={() => goToCheckout()}
                  Component="a"
                  width="100%"
                >
                  Proceed to Checkout
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
