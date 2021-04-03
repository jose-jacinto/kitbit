import { useRouter } from 'next/router'

import { Layout } from '@components/core'
import { Container, Text } from '@components/ui'

export default function Shipping() {
  const { locale } = useRouter()

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
            Os custos de envio para Portugal são grátis para pedidos acima de 100€. Todos os pedidos de 100€ ou abaixo têm um custo de entrega de 5€ que será aplicado no checkout.<br />
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
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Backorder
          </h5>
          <p>Todos os artigos com a descrição de backorder podem demorar 5 dias úteis a serem expedidos. Contacte-nos para uma estimativa correcta do tempo de expedição.</p>
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
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Backorder
          </h5>
          <p>All items that are available on backorder can take up to 5 business days to be shipped. Contact us for more information about the availability of these items.</p>

        </div>
      }
    </Container>
  )
}

Shipping.Layout = Layout


