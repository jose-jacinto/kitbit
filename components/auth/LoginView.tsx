import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'

import { loginUser, getUser } from 'whitebrim'

interface Props { }

const LoginView: FC<Props> = () => {
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

  const handleLogin = (values: any) => {
    setLoading(true)

    loginUser(values)
      .then((response) => {
        getUser()
          .then((response) => {
            setLoading(false)

            //* Context
            setUser(response.data)

            setButtonMessage(
              locale === 'pt' ? 'Login feito com sucesso' : 'Login successfully'
            )
            setTimeout(() => {
              setMessage('')
              setButtonMessage('')
            }, 2500)

            closeModal()
          })
          .catch(() => {
            setMessage(
              locale !== 'pt'
                ? 'Invalid email or password'
                : 'Email ou password inválidos'
            )
            setLoading(false)
            // setTimeout(() => {
            //   setMessage('')
            // }, 2500)
          })
      })
      .catch(() => {
        setMessage(
          locale !== 'pt'
            ? 'Invalid email or password'
            : 'Email ou password inválidos'
        )
        setLoading(false)
        // setTimeout(() => {
        //   setMessage('')
        // }, 2500)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>

      <div className="flex flex-col space-y-3">
        {message && locale === 'pt' ? (
          <div className="text-red border border-red p-3">
            {message} Esqueceu a sua {` `}
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              password?
            </a>
          </div>
        ) : (
          message && (
            <div className="text-red border border-red p-3">
              {message} Did you {` `}
              <a
                className="text-accent-9 inline font-bold hover:underline cursor-pointer"
                onClick={() => setModalView('FORGOT_VIEW')}
              >
                forgot your password?
              </a>
            </div>
          )
        )}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        <span className="form-error">{errors.email && emailMessage}</span>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({ required: true })}
        />
        <span className="form-error">{errors.password && requiredMessage}</span>

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={loading || message}
        >
          {buttonMessage ? buttonMessage : 'Log In'}
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accents-7">
            {locale === 'pt' ? 'Não tem uma conta?' : "Don't have an account?"}
          </span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('SIGNUP_VIEW')}
          >
            {locale === 'pt' ? 'Registe-se' : 'Sign Up'}
          </a>
        </div>
      </div>
    </form>
  )
}

export default LoginView
