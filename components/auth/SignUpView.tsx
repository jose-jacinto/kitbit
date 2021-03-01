import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { useRouter } from 'next/router'

import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input } from '@components/ui'

import { registerUser, getUser } from 'whitebrim'

interface Props {}

const SignUpView: FC<Props> = () => {
  const { locale } = useRouter()

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
        name: 'test',
        street1: 'test',
        street2: 'test',
        code: 'test',
        city: 'test',
        country: 'PT',
      },
      billing_address: {
        name: 'test',
        street1: 'test',
        street2: 'test',
        code: 'test',
        city: 'test',
        country: 'PT',
      },
      custom: {
        telephone: 'test',
        NIF: 'test',
      },
      cart_items: [],
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
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}
        <Input placeholder="First Name" onChange={setFirstName} />
        <Input placeholder="Last Name" onChange={setLastName} />
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />
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
