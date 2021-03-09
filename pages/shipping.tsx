// import type { GetStaticPropsContext } from 'next'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'
import { useRouter } from 'next/router'

export default function Shipping() {
  const { locale } = useRouter();

  // 'heading' | 'body' | 'pageHeading' | 'sectionHeading'

  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Envio' : 'Shipping'}
      </Text>

      <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
        <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
          Envios para Portugal
          </h5>
        <p className="py-6">
          Os custos de envio para Portugal são grátis.<br />
          As entrega são realizadas pelos CTT entre as 9h e as 19h nos dias úteis, e o tempo de envio não contempla domingos ou feriados.<br />
          * Os prazos mencionados não se aplicam ao caso dos Açores e da Madeira.<br /><br />
        </p>
        <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
          Envios para Comunidade Europeia
          </h5>
        <p className="py-6">
          Os custos de envio são calculados no checkout, mediante ao país escolhido para a entrega.<br />
          *Encomendas internacionais podem estar sujeitas a impostos, direitos aduaneiros e taxas cobradas no país de destino (Taxas de Importação). Não controlamos estes custos, nem conseguimos efetuar uma estimativa.
        </p>
      </div>
    </Container>
  )
}

Shipping.Layout = Layout
