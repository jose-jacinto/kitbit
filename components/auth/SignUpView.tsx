import { FC, useEffect, useState, useCallback } from 'react'
import cn from 'classnames'
import { validate } from 'email-validator'
import { useRouter } from 'next/router'

import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input } from '@components/ui'

import { registerUser, getUser } from 'whitebrim'

import s from './SignUpView.module.css'

interface Props {}

const SignUpView: FC<Props> = () => {
  const { locale } = useRouter()

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [extraData, setExtraData] = useState({
    street1: '',
    street2: '',
    code: '',
    city: '',
    country: 'PT',
    telephone: '',
    NIF: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal, setUser } = useUI()

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    let data = {
      name: {
        first: firstName,
        last: lastName,
      },
      email: email,
      password: password,
      shipping_address: {
        name: firstName + ' ' + lastName,
        street1: extraData.street1,
        street2: extraData.street2,
        code: extraData.code,
        city: extraData.city,
        country: extraData.country,
      },
      billing_address: {
        name: firstName + ' ' + lastName,
        street1: extraData.street1,
        street2: extraData.street2,
        code: extraData.code,
        city: extraData.city,
        country: extraData.country,
      },
      custom: {
        telephone: extraData.telephone,
        NIF: extraData.NIF,
      },
      // cart_items: [],
    }

    setLoading(true)
    registerUser(data)
      .then((response) => {
        getUser()
          .then((response) => {
            setLoading(false)
            setMessage(locale === 'pt' ? 'Sucesso' : 'Success')
            //* Context
            setUser(response.data)
            setTimeout(() => {
              setMessage('')
            }, 2500)
            closeModal()
          })
          .catch((error) => {
            setMessage(locale === 'pt' ? 'Erro' : 'Error')
            setLoading(false)
          })
      })
      .catch(({ errors }) => {
        setMessage(locale === 'pt' ? 'Erro' : 'Error')
        setLoading(false)
      })
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col justify-between p-3"
      style={{ width: '35rem' }}
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}

        <div className={cn(s.row)}>
          <div className={cn(s.col6)}>
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Primeiro Nome' : 'First Name'}
              onChange={setFirstName}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Último Nome' : 'Last Name'}
              onChange={setLastName}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              type="email"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder="Email"
              onChange={setEmail}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              type="password"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder="Password"
              onChange={setPassword}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Morada' : 'Address'}
              onChange={(ev) => setExtraData({ ...extraData, street1: ev })}
            />
          </div>

          <div className={cn(s.col6)}>
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={
                locale === 'pt'
                  ? 'Número, Apartamento, etc...'
                  : 'Nº, Apartment etc...'
              }
              onChange={(ev) => setExtraData({ ...extraData, street2: ev })}
            />
          </div>

          <div className={cn(s.col6)}>
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Código Postal' : 'Zip Code'}
              onChange={(ev) => {
                setExtraData({ ...extraData, code: ev })
              }}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Cidade' : 'City'}
              onChange={(ev) => setExtraData({ ...extraData, city: ev })}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'Telefone' : 'Telephone'}
              onChange={(ev) => setExtraData({ ...extraData, telephone: ev })}
            />
          </div>
          <div className={cn(s.col6)}>
            <Input
              type="text"
              style={{ width: '95%', marginBottom: 10 }}
              placeholder={locale === 'pt' ? 'NIF' : 'NIF'}
              onChange={(ev) => setExtraData({ ...extraData, NIF: ev })}
            />
          </div>
        </div>

        <span className="text-accents-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{' '}
          {locale === 'pt' ? (
            <span className="leading-6 text-sm">
              <strong>Informação</strong>: A password deve ter mais de 7
              caracteres e incluir números
            </span>
          ) : (
            <span className="leading-6 text-sm">
              <strong>Info</strong>: Passwords must be longer than 7 chars and
              include numbers.{' '}
            </span>
          )}
        </span>
        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            {locale === 'pt' ? 'Registar' : 'Sign Up'}
          </Button>
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-accents-7">
            {locale === 'pt' ? 'Tem uma conta?' : 'Do you have an account?'}
          </span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('LOGIN_VIEW')}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  )
}

export default SignUpView
