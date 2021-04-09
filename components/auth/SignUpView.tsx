import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'

import { registerUser, getUser } from 'whitebrim'

interface Props {}

const SignUpView: FC<Props> = () => {
  const { locale } = useRouter()

  const { register, handleSubmit, watch, errors } = useForm()
  watch('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [buttonMessage, setButtonMessage] = useState('')

  const { setModalView, closeModal, setUser } = useUI()

  const emailMessage =
    locale === 'pt'
      ? 'Preencha este campo com um endereço de email válido'
      : 'Fill in this field with a valid email address'
  const requiredMessage =
    locale === 'pt' ? 'Este campo é obrigatório' : 'This field is required'

  const handleSignup = (values: any) => {
    setLoading(true)

    let submitValues = {
      ...values,
      shipping_address: {
        name: values.name.first + ' ' + values.name.last,
        street1: values.street1,
        street2: values.street2,
        code: values.code,
        city: values.city,
        country: '-',
      },
      billing_address: {
        name: values.name.first + ' ' + values.name.last,
        street1: values.street1,
        street2: values.street2,
        code: values.code,
        city: values.city,
        country: '-',
      },
    }

    registerUser(submitValues)
      .then((response) => {
        getUser()
          .then((response) => {
            setLoading(false)

            //* Context
            setUser(response.data)

            setButtonMessage(
              locale === 'pt'
                ? 'Registo feito com sucesso'
                : 'Successful registration'
            )
            setTimeout(() => {
              setMessage('')
              setButtonMessage('')
            }, 2500)
            closeModal()
          })
          .catch(() => {
            setMessage(locale === 'pt' ? 'Erro' : 'Error')
            setLoading(false)
            setTimeout(() => {
              setMessage('')
            }, 2500)
          })
      })
      .catch(() => {
        setMessage(locale === 'pt' ? 'Erro' : 'Error')
        setLoading(false)
        setTimeout(() => {
          setMessage('')
        }, 2500)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      noValidate
      className="flex flex-col justify-between p-3"
      style={{ width: '45rem' }}
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="125px" />
      </div>

      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}

        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="name"
              name="name.first"
              placeholder={locale === 'pt' ? 'Primeiro Nome' : 'First Name'}
              ref={register({
                required: true,
              })}
            />
            <span className="form-error">
              {errors.name && errors.name.first && requiredMessage}
            </span>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="name"
              name="name.last"
              placeholder={locale === 'pt' ? 'Último Nome' : 'Last Name'}
              ref={register({
                required: true,
              })}
            />
            <span className="form-error">
              {errors.name && errors.name.last && requiredMessage}
            </span>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="email"
              name="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <span className="form-error">{errors.email && emailMessage}</span>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="password"
              name="password"
              placeholder="Password"
              ref={register({ required: true })}
            />
            <span className="form-error">
              {errors.password && requiredMessage}
            </span>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="text"
              name="street1"
              placeholder={locale === 'pt' ? 'Morada' : 'Address'}
              ref={register}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="text"
              name="street2"
              placeholder={
                locale === 'pt'
                  ? 'Número, Apartamento, etc...'
                  : 'Nº, Apartment etc...'
              }
              ref={register}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="text"
              name="code"
              placeholder={locale === 'pt' ? 'Código Postal' : 'Zip Code'}
              ref={register}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="text"
              name="city"
              placeholder={locale === 'pt' ? 'Cidade' : 'City'}
              ref={register}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="text"
              name="custom.telephone"
              placeholder={locale === 'pt' ? 'Telefone' : 'Telephone'}
              ref={register}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              style={{ width: '95%', marginBottom: 10 }}
              type="text"
              name="custom.nif"
              placeholder={locale === 'pt' ? 'NIF' : 'NIF'}
              ref={register}
            />
          </div>
        </div>

        <div className="pt-2 w-full flex flex-col mt-12">
          <Button
            variant="slim"
            type="submit"
            loading={loading}
            disabled={loading || message}
          >
            {buttonMessage
              ? buttonMessage
              : locale === 'pt'
              ? 'Registar'
              : 'Sign Up'}
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
