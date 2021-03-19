import { useRouter } from 'next/router'

import { Container, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Layout } from '@components/core'
import { Bag } from '@components/icons'
import { OrderCard } from '@components/order'

export default function Orders() {
  const { user } = useUI()
  const { locale } = useRouter()

  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Encomendas' : 'My Orders'}
      </Text>
      {user && user.orders && user.orders.length > 0 && user.orders[0]._id ? (
        user.orders.map((order: any) => (
          <OrderCard item={order} locale={locale} />
        ))
      ) : (
        <div className="flex-1 p-24 flex flex-col justify-center items-center ">
          <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            {locale === 'pt'
              ? 'Não foram encontradas encomendas'
              : 'No orders found'}
          </h2>
        </div>
      )}
    </Container>
  )
}

Orders.Layout = Layout
