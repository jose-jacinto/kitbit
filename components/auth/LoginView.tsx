import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { useRouter } from 'next/router'

import { Logo, Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'

import { loginUser, getUser, setUser } from 'whitebrim'

interface Props {}

const LoginView: FC<Props> = () => {
  const { locale } = useRouter()

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal, setUser } = useUI()

  const handleLogin = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    let data = {
      email: email,
      password: password,
    }

    setLoading(true)
    loginUser(data)
      .then((response) => {
        getUser()
          .then((response) => {
            setLoading(false)
            //* Context
            setUser(response.data)
            setTimeout(() => {
              setMessage('')
            }, 2500)
            closeModal()
          })
          .catch((error) => {
            setMessage(
              locale !== 'pt'
                ? 'Invalid email or password'
                : 'Email ou password inválidos'
            )
            setLoading(false)
          })
      })
      .catch(({ errors }) => {
        setMessage(
          locale !== 'pt'
            ? 'Invalid email or password'
            : 'Email ou password inválidos'
        )
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
      onSubmit={handleLogin}
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
        <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Log In
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
