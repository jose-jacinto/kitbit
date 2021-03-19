import React, { FC } from 'react'
import cn from 'classnames'
import s from './OrderCard.module.css'
import moment from 'moment'

interface Props {
  item: any
  locale: any
}

const OrderCard: FC<Props> = (item: any, locale: any) => {
  const statusPaid = locale === 'pt' ? 'Pago' : 'Paid'
  const statusProcessing = locale === 'pt' ? 'Em processamento' : 'Processing'
  const statusSent = locale === 'pt' ? 'Enviado' : 'Sent'

  return (
    <div className={cn(s.root, 'border-t-4 border-gray-200')}>
      <div className="col-span-1 ">
        <p className="mt-5 text-xl leading-7 text-accent-2 text-black font-bold mb-2">
          {locale === 'pt' ? 'Pedido Nº' : 'Order Nº'}
          {item.internal_ordern} -{' '}
          {item.workflow_status === 'paid'
            ? statusPaid
            : item.workflow_status === 'fullfilled'
            ? statusSent
            : statusProcessing}
        </p>
        <p className="mb-2">{moment(item.createdOn).format('DD-MM-YYYY')}</p>
        <p className="mb-2">01 Item(s)</p>
        <p className="text-kitbit font-bold mb-2">
          {item.total_amount.toFixed(2)} €
        </p>
      </div>
    </div>
  )
}

export default OrderCard
