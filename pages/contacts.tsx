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

      {locale === 'pt' ?
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Loja
          </h5>
          <p className="py-6">
            Neste momento estamos encerrados devido às restrições impostas pela DGS.<br /><br />
            Rua Margarida de Abreu<br />
            No 13, Esc 3<br />
            1900-314 Lisboa<br />
            Portugal
          </p>
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Email
          </h5>
          <p className="py-6">
            <a href="mailto:store@kitbit.eu">store@kitbit.eu</a>
          </p>
        </div>
        :
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Store
          </h5>
          <p className="py-6">
            Our location is closed during this period <br /><br />
            Rua Margarida de Abreu<br />
            No 13, Esc 3<br />
            1900-314 Lisboa<br />
            Portugal
          </p>
          <h5 className="text-4xl tracking-tight leading-10 font-extrabold">
            Email
          </h5>
          <p className="py-6">
            <a href="mailto:store@kitbit.eu">store@kitbit.eu</a>
          </p>
        </div>
      }

    </Container>
  )
}

Contacts.Layout = Layout
