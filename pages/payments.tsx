// import type { GetStaticPropsContext } from 'next'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'
import { useRouter } from 'next/router'

export default function Payments() {
  const { locale } = useRouter()
  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Métodos e Pagamentos' : 'My Payments'}
      </Text>
    </Container>
  )
}

Payments.Layout = Layout
