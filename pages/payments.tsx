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

          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Devoluções
          </h5>
          <p>Tem 14 dias após o envio dos produtos para efectuar um pedido de devolução. Todos os produtos devolvidos não podem ter sido abertos e devem estar em perfeito estado, incluindo embalagens e manuais. Produtos electrónicos com circuitos expostos não são passíveis de devolução. Para qualquer devolução deve contactar através do email <a href="mailto:store@kitbit.eu">store@kitbit.eu</a>.
          </p>

          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            IVA
          </h5>
          <p>Todos os preços exibidos no website incluem IVA à taxa legal actual.
          </p>

        </div>
        :
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Credit / Debit Cards
          </h5>
          <p className="py-6">
            We accept the following credit cards Visa, Visa Electron, MasterCard, American Express, Discover.
          </p>
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Bank transfer
          </h5>
          <p className="py-6">
            We accept bank transfer and you can request this method of payment during checkout. You will receive more information after concluding the purchase. We will only ship any orders with this method after validation of the bank transfer
          </p>

          <br />
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Returns
          </h5>
          <p>You have 14 days from the shipping date of your order to request a return and refund of your purchase from Kitbit. For return eligibility, all the items must be unopen and in perfect conditions. Exposed circuit products may not be eligible to return and refund.<br />
            You can request a return and refund by contacting us at <a href="mailto:store@kitbit.eu">store@kitbit.eu</a>.
          </p>

          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            VAT
          </h5>
          <p>All prices include Portuguese VAT of 23%. If you have a registered european company you can contact us for VAT exemption.
          </p>

        </div>
      }
    </Container>
  )
}

Payments.Layout = Layout
