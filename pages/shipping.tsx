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
      {locale === 'pt' ?
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
        :
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Shipping to Portugal
          </h5>
          <p className="py-6">
            All order delivery to continental Portugal are free of charge.<br />
            Our current provider is CTT and we estimate a 48 hour delivery time after order confirmation.<br />
          </p>
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            EU Shipping
          </h5>
          <p className="py-6">
            A flat fee of 15€ will be applied to all EU Countries. You can check the fees during the checkout.<br />
          </p>
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            International Shipping
          </h5>
          <p className="py-6">
            For orders outside EU the checkout calculator will inform you the correct shipping fee.<br />
            We are not responsible for any customs tax or extra fees that you may incurr.
          </p>
        </div>
      }
    </Container>
  )
}

Shipping.Layout = Layout


