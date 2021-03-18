import { Transition } from '@headlessui/react'

import { Layout } from '@components/core'
import { Heart } from '@components/icons'
import { Container, Text } from '@components/ui'
import { WishlistCard } from '@components/wishlist'

export default function Wishlist() {
  // MISSING API
  const data = {
    items: [],
  }

  return (
    <Container>
      <div className="mt-3 mb-20">
        <Text variant="pageHeading">My Wishlist</Text>
        <div className="group flex flex-col">
          {true ? (
            <Transition show>
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
                  <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                    <Heart className="absolute" />
                  </span>
                  <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                    Your wishlist is empty
                  </h2>
                  <p className="text-accents-6 px-10 text-center pt-2">
                    Biscuit oat cake wafer icing ice cream tiramisu pudding
                    cupcake.
                  </p>
                </div>
              </Transition.Child>
            </Transition>
          ) : (
            <Transition show>
              {data &&
                data.items.map((item: any) => (
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <WishlistCard key={item._id} item={item} />
                  </Transition.Child>
                ))}
            </Transition>
          )}
        </div>
      </div>
    </Container>
  )
}

Wishlist.Layout = Layout
