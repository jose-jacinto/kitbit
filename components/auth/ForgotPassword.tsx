import { FC, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Logo, Button, Input } from '@components/ui'

import { useUI } from '@components/ui/context'

import { submitRecoverPassword, submitResetPassword } from 'whitebrim'

interface Props {}

const ForgotPassword: FC<Props> = () => {
  const { locale, query, replace } = useRouter()
  const { register, handleSubmit, watch, errors } = useForm()
  watch('')

  const password = useRef({})
  password.current = watch('password', '')

  const [loadingRequest, setLoadingRequest] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')
  const [changingPwd, setChangingPwd] = useState(false)

  const { setModalView, closeModal } = useUI()

  const emailMessage =
    locale === 'pt'
      ? 'Preencha este campo com um endereço de email válido'
      : 'Fill in this field with a valid email address'
  const requiredMessage =
    locale === 'pt' ? 'Este campo é obrigatório' : 'This field is required'
  const passwordMessage =
    locale === 'pt' ? 'Palavras-passe não coincidem' : 'Passwords do not match'

  useEffect(() => {
    if (query.req_link_param && query.rel_usr) {
      setChangingPwd(true)
    } else {
      setChangingPwd(false)
    }
  }, [query.req_link_param && query.rel_usr])

  const handleResetPassword = (values: any) => {
    setLoadingRequest(true)
    submitRecoverPassword(values)
      .then(() => {
        setLoadingRequest(false)
        setRequestMessage(
          locale === 'pt'
            ? 'Email enviado com indicações'
            : 'Email sent with indications'
        )
        setTimeout(() => {
          setRequestMessage('')
          closeModal()
        }, 3000)
      })
      .catch((err) => {
        setLoadingRequest(false)
        setRequestMessage(
          locale === 'pt' ? 'Erro, tente mais tarde!' : 'Error, try later!'
        )
        setTimeout(() => {
          setRequestMessage('')
        }, 3000)
      })
  }

  const onSubmitChangePwd = (values: any) => {
    setLoadingRequest(true)
    let submitValues = {
      password: values.password,
      email: values.email,
      user_ref: query.rel_usr,
      query_ref: query.req_link_param,
    }
    submitResetPassword(submitValues)
      .then(() => {
        setLoadingRequest(false)
        setRequestMessage(
          locale === 'pt'
            ? 'Password alterada com sucesso'
            : 'Password successfully changed'
        )
        setTimeout(() => {
          setRequestMessage('')
          setModalView('LOGIN_VIEW')
          replace(locale === 'pt' ? '/pt' : '', undefined, { shallow: true })
        }, 3000)
      })
      .catch((err) => {
        setLoadingRequest(false)
        setRequestMessage(
          locale === 'pt' ? 'Erro, tente mais tarde!' : 'Error, try later!'
        )
        setTimeout(() => {
          setRequestMessage('')
        }, 3000)
      })
  }

  return !changingPwd ? (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      noValidate
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>

      <div className="flex flex-col space-y-4">
        {requestMessage && (
          <div className="text-red border border-red p-3">{requestMessage}</div>
        )}

        <Input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        <span className="form-error">{errors.email && emailMessage}</span>

        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loadingRequest}
            disabled={loadingRequest || requestMessage}
          >
            {locale === 'pt' ? 'Recuperar Password' : 'Recover Password'}
          </Button>
        </div>

        <span className="pt-3 text-center text-sm">
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
  ) : (
    <form
      onSubmit={handleSubmit(onSubmitChangePwd)}
      noValidate
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="125px" />
      </div>
      <div className="flex flex-col space-y-4">
        {requestMessage && (
          <div className="text-red border border-red p-3">{requestMessage}</div>
        )}

        <Input
          type="email"
          placeholder="Email"
          name="email"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        <span className="form-error">{errors.email && emailMessage}</span>
        <Input
          type="password"
          placeholder={locale === 'pt' ? 'Nova password' : 'New password'}
          name="password"
          ref={register({ required: true })}
        />
        <span className="form-error">{errors.password && requiredMessage}</span>
        <Input
          type="password"
          placeholder={
            locale === 'pt' ? 'Confirmar nova password' : 'Confirm new password'
          }
          name="confirm_password"
          ref={register({
            required: true,
            validate: (value) => value === password.current || passwordMessage,
          })}
        />
        <span className="form-error">
          {errors.confirm_password && passwordMessage}
        </span>

        <div className="pt-2 w-full flex flex-col">
          <Button
            variant="slim"
            type="submit"
            loading={loadingRequest}
            disabled={loadingRequest || requestMessage}
          >
            {locale === 'pt' ? 'Alterar Password' : 'Change Password'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword
