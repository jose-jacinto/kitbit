import { useState } from 'react'

import { useRouter } from 'next/router'

import { Layout } from '@components/core'
import { Container, Input, Text } from '@components/ui'
import { useUI } from '@components/ui/context'

export default function Profile() {
  const { locale } = useRouter()
  const { user, setUser } = useUI()

  const [userState, setUserState] = useState<any>(null)

  if (user && !userState) {
    setUserState(user)
  }

  return (
    <Container>
      <Text variant="pageHeading">
        {locale === 'pt' ? 'Perfil' : 'My Profile'}
      </Text>
      {user && userState && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-6 pr-1">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Primeiro Nome' : 'First Name'}
              value={userState.name.first}
              onChange={(ev) =>
                setUserState({ ...user, name: { ...user.name, first: ev } })
              }
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Último Nome' : 'Last Name'}
              onChange={(ev) =>
                setUserState({ ...user, name: { ...user.name, last: ev } })
              }
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="email"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder="Email"
              onChange={(ev) => setUserState({ ...user, email: ev })}
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Morada' : 'Address'}
              onChange={(ev) =>
                setUserState({
                  ...user,
                  shipping_address: {
                    ...user.shipping_address,
                    shipping_address: ev,
                  },
                })
              }
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={
                locale === 'pt'
                  ? 'Número, Apartamento, etc...'
                  : 'Nº, Apartment etc...'
              }
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Código Postal' : 'Zip Code'}
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Cidade' : 'City'}
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Telefone' : 'Telephone'}
            />
          </div>
          <div className="lg:col-span-6 pr-1">
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'NIF' : 'NIF'}
            />
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
