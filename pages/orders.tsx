// import type { GetStaticPropsContext } from 'next'
import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'
import { Bag } from '@components/icons'

import { useRouter } from 'next/router'
export default function Orders() {
  const { locale } = useRouter()

  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Encomendas' : 'My Orders'}
      </Text>
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
    </Container>
  )
}

Orders.Layout = Layout
