import { FC, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { CartSidebarView } from '@components/cart'
import { Container, Sidebar, Button, Modal, Toast } from '@components/ui'
import { Navbar, Featurebar, Footer } from '@components/core'
import { LoginView, SignUpView, ForgotPassword } from '@components/auth'
import { useUI } from '@components/ui/context'
import { ImageView } from '@components/kitbit'
import { usePreventScroll } from '@react-aria/overlays'
import s from './Layout.module.css'
import debounce from 'lodash.debounce'
interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
    toastText,
    closeToast,
    displayToast,
  } = useUI()
  const [cookie_consent, setCookieConsent] = useState<any>(null)
  const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { locale = 'en-US', pathname } = useRouter()

  usePreventScroll({
    isDisabled: !(displaySidebar || displayModal),
  })

  const handleScroll = useCallback(() => {
    debounce(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      if (scrollTop > offset) setHasScrolled(true)
      else setHasScrolled(false)
    }, 1)
  }, [])

  useEffect(() => {
    if (!cookie_consent && typeof window !== 'undefined')
      setCookieConsent(localStorage.getItem('cookie_consent') ? true : false)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true')
    setAcceptedCookies(true)
  }

  return (
    <div className={cn(s.root)}>
      <header
        className={cn(
          'sticky top-0 bg-primary z-40 transition-all duration-150',
          { 'shadow-magical': hasScrolled }
        )}
      >
        <Container>
          <Navbar />
        </Container>
      </header>
      <main className={`fit ${pathname === '/profile' && 'bg-gray-100'}`}>
        {children}
      </main>
      <Footer />
      <Sidebar open={displaySidebar} onClose={closeSidebar}>
        <CartSidebarView />
      </Sidebar>

      <Modal open={displayModal} onClose={closeModal}>
        {modalView === 'LOGIN_VIEW' && <LoginView />}
        {modalView === 'SIGNUP_VIEW' && <SignUpView />}
        {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        {modalView === 'IMAGE_VIEW' && <ImageView />}
      </Modal>
      {cookie_consent !== null && (
        <Featurebar
          title={
            locale === 'pt'
              ? 'Este website utiliza cookies para garantir a melhor experiência possível.'
              : 'This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy.'
          }
          hide={acceptedCookies || cookie_consent}
          action={
            <Button className="mx-5" onClick={acceptCookies}>
              {locale === 'pt' ? 'Aceitar Cookies' : 'Accept cookies'}
            </Button>
          }
        />
      )}
      <Toast open={displayToast} onClose={closeModal}>
        {toastText}
      </Toast>
    </div>
  )
}

export default Layout
