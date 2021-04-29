import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Container, Input, Text, LoadingDots } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Layout } from '@components/core'

import { editUser, changePassword } from 'whitebrim'

export default function Profile() {
  const { locale } = useRouter()
  const { user, setUser } = useUI()
  const [userInit, setUserInit] = useState(false)

  const buttonText = locale === 'pt' ? 'Guardar Alterações' : 'Save Changes'
  const emailMessage =
    locale === 'pt'
      ? 'Preencha este campo com um endereço de email válido'
      : 'Fill in this field with a valid email address'
  const requiredMessage =
    locale === 'pt' ? 'Este campo é obrigatório' : 'This field is required'
  const passwordMessage =
    locale === 'pt' ? 'Palavras-passe não coincidem' : 'Passwords do not match'

  const [activeForm, setActiveForm] = useState('account')

  //* 1st Form => AccDetails
  const [loadingRequestAcc, setLoadingRequestAcc] = useState(false)
  const [requestMessageAcc, setRequestMessageAcc] = useState('')
  //* 2nd Form => AddressDetails
  const [loadingRequestAddress, setLoadingRequestAddress] = useState(false)
  const [requestMessageAddress, setRequestMessageAddress] = useState('')
  //* 3rd Form => ChangePwd
  const [loadingRequestPwd, setLoadingRequestPwd] = useState(false)
  const [requestMessagePwd, setRequestMessagePwd] = useState('')

  //* 1st Form => AccDetails
  const {
    register: registerAcc,
    handleSubmit: submitAcc,
    watch: watchAcc,
    reset: resetAcc,
    errors: errorsAcc,
  } = useForm({
    defaultValues: {
      name: user && user.name,
      email: user && user.localProfile && user.localProfile.email,
      custom: {
        nif:
          user && user.custom.nif !== ''
            ? user && user.custom.nif
            : user && user.custom.nif,
        telephone: user && user.custom.telephone,
      },
    },
  })
  watchAcc('')

  //* 2nd Form => AddressDetails
  const {
    register: registerAddress,
    handleSubmit: submitAddress,
    watch: watchAddress,
    reset: resetAddress,
    errors: errorsAddress,
  } = useForm({
    defaultValues: {
      billing_address: user && user.billing_address,
      shipping_address: user && user.shipping_address,
    },
  })
  watchAddress('')

  //* 3rd Form => ChangePwd
  const {
    register: registerPwd,
    handleSubmit: submitPwd,
    watch: watchPwd,
    reset: resetPwd,
    errors: errorsPwd,
  } = useForm()

  const new_password = useRef({})
  new_password.current = watchPwd('new_password', '')

  //* 1st Form => AccDetails
  const onSubmitAccDetails = (data: any) => {
    let submitValues = {
      ...data,
      email: data.localProfile.email,
      custom: {
        nif: data.custom.nif,
        telephone: data.custom.telephone,
      },
      billing_address: user.billing_address,
      shipping_address: user.shipping_address,
    }
    setLoadingRequestAcc(true)
    editUser(submitValues)
      .then((response) => {
        delete response.data.cart
        setUser(response.data)
        setLoadingRequestAcc(false)
        setRequestMessageAcc(locale === 'pt' ? 'Guardado' : 'Saved')
        setTimeout(() => {
          setRequestMessageAcc('')
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
        fatalErrorAcc()
      })
  }
  const fatalErrorAcc = () => {
    setLoadingRequestAcc(false)
    setRequestMessageAcc(
      locale === 'pt' ? 'Erro, tente mais tarde!' : 'Error, try later!'
    )
    setTimeout(() => {
      setRequestMessageAcc('')
    }, 2500)
  }
  //* 2nd Form => AddressDetails
  const onSubmitAccAddress = (data: any) => {
    let submitValues = {
      name: user && user.name,
      email: user && user.localProfile.email,
      ...data,
    }
    setLoadingRequestAddress(true)
    editUser(submitValues)
      .then((response) => {
        delete response.data.cart
        setUser(response.data)
        setLoadingRequestAddress(false)
        setRequestMessageAddress(locale === 'pt' ? 'Guardado' : 'Saved')
        setTimeout(() => {
          setRequestMessageAddress('')
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
        fatalErrorAddress()
      })
  }
  const fatalErrorAddress = () => {
    setLoadingRequestAddress(false)
    setRequestMessageAddress(
      locale === 'pt' ? 'Erro, tente mais tarde!' : 'Error, try later!'
    )
    setTimeout(() => {
      setRequestMessageAddress('')
    }, 2500)
  }

  //* 4th Form => ChangePwd
  const onSubmitChangePwd = (data: any) => {
    let submitValues = {
      email: user && user.localProfile.email,
      ...data,
    }
    setLoadingRequestPwd(true)
    changePassword(submitValues)
      .then((response) => {
        resetPwd()
        setLoadingRequestPwd(false)
        setRequestMessagePwd(
          locale === 'pt' ? 'Password alterada' : 'Password changed'
        )
        setTimeout(() => {
          setRequestMessagePwd('')
        }, 2500)
      })
      .catch((err) => {
        console.log(err)
        fatalErrorChangePwd()
      })
  }
  const fatalErrorChangePwd = () => {
    setLoadingRequestPwd(false)
    setRequestMessagePwd(
      locale === 'pt' ? 'Erro, tente mais tarde!' : 'Error, try later!'
    )
    setTimeout(() => {
      setRequestMessagePwd('')
    }, 2500)
  }

  if (user && !userInit) {
    resetAcc(user)
    resetAddress(user)
    resetPwd(user)
    setUserInit(true)
  }

  return (
    <Container className="pt-6 pb-5">
      {user && (
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 mb-10">
            <div className="px-4 sm:px-0 mb-4">
              <a
                className={`flex items-center py-2 pr-8 pl-4 text-gray-700 border-r-4 cursor-pointer hover:bg-gray-200 ${activeForm === 'account' && 'bg-gray-200 border-kitbit'
                  }`}
                onClick={() => setActiveForm('account')}
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h3 className="text-lg font-medium leading-6 text-gray-900 ml-4">
                  {locale === 'pt' ? 'Conta' : 'Account'}
                </h3>
              </a>
            </div>
            <div className="px-4 sm:px-0 mb-4">
              <a
                className={`flex items-center py-2 pr-8 pl-4 text-gray-700 border-r-4 cursor-pointer hover:bg-gray-200 ${activeForm === 'address' && 'bg-gray-200 border-kitbit'
                  }`}
                onClick={() => setActiveForm('address')}
              >
                <svg
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <h3 className="text-lg font-medium leading-6 text-gray-900 ml-4">
                  {locale === 'pt' ? 'Morada' : 'Address'}
                </h3>
              </a>
            </div>
            <div className="px-4 sm:px-0 mb-4">
              <a
                className={`flex items-center py-2 pr-8 pl-4 text-gray-700 border-r-4 cursor-pointer hover:bg-gray-200 ${activeForm === 'password' && 'bg-gray-200 border-kitbit'
                  }`}
                onClick={() => setActiveForm('password')}
              >
                <svg
                  className="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                <h3 className="text-lg font-medium leading-6 text-gray-900 ml-4">
                  Password
                </h3>
              </a>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 mb-10">
            {activeForm === 'account' ? (
              <form onSubmit={submitAcc(onSubmitAccDetails)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          {locale === 'pt' ? 'Primeiro Nome' : 'First Name'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="text"
                          id="name.first"
                          name="name.first"
                          ref={registerAcc({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAcc.name &&
                            errorsAcc.name.first &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Primeiro Nome' : 'First Name'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="text"
                          id="name.last"
                          name="name.last"
                          ref={registerAcc({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAcc.name &&
                            errorsAcc.name.last &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          Email
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="email"
                          id="localProfile.email"
                          name="localProfile.email"
                          ref={registerAcc({
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                        />
                        <span className="form-error">
                          {errorsAcc.email && emailMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          Telefone
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="text"
                          id="custom.telephone"
                          name="custom.telephone"
                          ref={registerAcc({
                            required: true,
                          })}
                        />
                        {errorsAcc.custom &&
                          errorsAcc.custom.telephone &&
                          requiredMessage}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          NIF
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="text"
                          id="custom.nif"
                          name="custom.nif"
                          ref={registerAcc({
                            required: true,
                          })}
                        />
                        {errorsAcc.custom &&
                          errorsAcc.custom.nif &&
                          requiredMessage}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-kitbit hover:bg-kitbit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kitbit"
                      disabled={loadingRequestAcc || requestMessageAcc !== ''}
                    >
                      {loadingRequestAcc ? (
                        <LoadingDots className="bg-white" />
                      ) : requestMessageAcc !== '' ? (
                        requestMessageAcc
                      ) : (
                        buttonText
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : activeForm === 'address' ? (
              <form onSubmit={submitAddress(onSubmitAccAddress)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <Text variant="sectionHeading">
                      {locale === 'pt'
                        ? 'Dados de Entrega'
                        : 'Shipping Address'}
                    </Text>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          {locale === 'pt' ? 'Nome' : 'Name'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="text"
                          id="shipping_address.name"
                          name="shipping_address.name"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.shipping_address &&
                            errorsAddress.shipping_address.name &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Morada' : 'Address'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="shipping_address.street1"
                          id="shipping_address.street1"
                          name="shipping_address.street1"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.shipping_address &&
                            errorsAddress.shipping_address.street1 &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt'
                            ? 'Rua, apartamento etc'
                            : 'Street, apartment etc'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="shipping_address.street2"
                          id="shipping_address.street2"
                          name="shipping_address.street2"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.shipping_address &&
                            errorsAddress.shipping_address.street2 &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Código Postal' : 'Zip Code'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="shipping_address.code"
                          id="shipping_address.code"
                          name="shipping_address.code"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.shipping_address &&
                            errorsAddress.shipping_address.code &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Cidade' : 'City'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="shipping_address.city"
                          id="shipping_address.city"
                          name="shipping_address.city"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.shipping_address &&
                            errorsAddress.shipping_address.city &&
                            requiredMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <Text variant="sectionHeading">
                      {locale === 'pt'
                        ? 'Dados de Faturação'
                        : 'Billing Address'}
                    </Text>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-12 sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                          {locale === 'pt' ? 'Nome' : 'Name'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="text"
                          id="billing_address.name"
                          name="billing_address.name"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.billing_address &&
                            errorsAddress.billing_address.name &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Morada' : 'Address'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="billing_address.street1"
                          id="billing_address.street1"
                          name="billing_address.street1"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.billing_address &&
                            errorsAddress.billing_address.street1 &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt'
                            ? 'Rua, apartamento etc'
                            : 'Street, apartment etc'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="billing_address.street2"
                          id="billing_address.street2"
                          name="billing_address.street2"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.billing_address &&
                            errorsAddress.billing_address.street2 &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Código Postal' : 'Zip Code'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="billing_address.code"
                          id="billing_address.code"
                          name="billing_address.code"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.billing_address &&
                            errorsAddress.billing_address.code &&
                            requiredMessage}
                        </span>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700  mb-4">
                          {locale === 'pt' ? 'Cidade' : 'City'}
                        </label>
                        <Input
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                          type="billing_address.city"
                          id="billing_address.city"
                          name="billing_address.city"
                          ref={registerAddress({
                            required: true,
                          })}
                        />
                        <span className="form-error">
                          {errorsAddress.billing_address &&
                            errorsAddress.billing_address.city &&
                            requiredMessage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-kitbit hover:bg-kitbit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kitbit"
                      disabled={
                        loadingRequestAddress || requestMessageAddress !== ''
                      }
                    >
                      {loadingRequestAddress ? (
                        <LoadingDots className="bg-white" />
                      ) : requestMessageAddress !== '' ? (
                        requestMessageAddress
                      ) : (
                        buttonText
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              activeForm === 'password' && (
                <form onSubmit={submitPwd(onSubmitChangePwd)}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            {locale === 'pt'
                              ? 'Password Atual'
                              : 'Current Password'}
                          </label>
                          <Input
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                            type="password"
                            id="password"
                            name="password"
                            ref={registerPwd({ required: true })}
                          />
                          <span className="form-error">
                            {errorsPwd.password && requiredMessage}
                          </span>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            {locale === 'pt' ? 'Nova Password' : 'New Password'}
                          </label>
                          <Input
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                            type="password"
                            id="new_password"
                            name="new_password"
                            ref={registerPwd({ required: true })}
                          />
                          <span className="form-error">
                            {errorsPwd.new_password && requiredMessage}
                          </span>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            {locale === 'pt'
                              ? 'Confirmar Nova Password'
                              : 'Confirm New Password'}
                          </label>
                          <Input
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm"
                            type="password"
                            id="confirm_new_password"
                            name="confirm_new_password"
                            ref={registerPwd({
                              validate: (value) =>
                                value === new_password.current ||
                                passwordMessage,
                            })}
                          />
                          <span className="form-error">
                            {errorsPwd.confirm_new_password && passwordMessage}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-kitbit hover:bg-kitbit focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kitbit"
                        disabled={loadingRequestPwd || requestMessagePwd !== ''}
                      >
                        {loadingRequestPwd ? (
                          <LoadingDots className="bg-white" />
                        ) : requestMessagePwd !== '' ? (
                          requestMessagePwd
                        ) : (
                          buttonText
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      )}
    </Container>
  )
}

Profile.Layout = Layout
