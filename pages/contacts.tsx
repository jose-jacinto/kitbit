import { useRouter } from 'next/router'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'

export default function Contacts() {
  const { locale } = useRouter()

  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Contactos' : 'Contacts'}
      </Text>
    </Container>
  )
}

Contacts.Layout = Layout
