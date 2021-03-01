// import type { GetStaticPropsContext } from 'next'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'
import { useRouter } from 'next/router'

export default function Shipping() {
  const { locale } = useRouter()
  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Portes e Envio' : 'My Shipping'}
      </Text>
    </Container>
  )
}

Shipping.Layout = Layout
