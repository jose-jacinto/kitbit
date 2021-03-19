import { useRouter } from 'next/router'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'

export default function Payments() {
  const { locale } = useRouter()

  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Métodos de Pagamento' : 'Payments'}
      </Text>

      {locale === 'pt' ?
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Cartão de Crédito / Débito
          </h5>
          <p className="py-6">
            São aceites os cartões de crédito e débito Visa, Visa Electron, MasterCard, American Express, Discover.
          </p>
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Transferência Bancária
          </h5>
          <p className="py-6">
            Aceitamos esta modalidade de pagamento. Se optar por transferência bancária deverá selecionar esse modo de pagamento no checkout. As encomendas só serão expedidas após boa confirmação bancária.
          </p>
        </div>
        :
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Shipping to Portugal
          </h5>
          <p className="py-6">
            The delivery cost to continental Portugal is free of charge on all orders above 100€. For orders of 100€ and below, a flat fee of 5€ will be applied to your checkout.<br />
            Our current provider is CTT and we estimate a 48 hour delivery time after order confirmation.<br />
          </p>
        </div>
      }
    </Container>
  )
}

Payments.Layout = Layout
