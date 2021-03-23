import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Github } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/core'

import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
}

const Footer: FC<Props> = ({ className }) => {
  const { locale } = useRouter()
  const rootClassName = cn(className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary bg-primary transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border-gray-700 mr-2">
                  <Logo />
                </span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ul className="flex flex-initial flex-col md:flex-1">
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    Home
                  </a>
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/blog">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    Blog
                  </a>
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/shipping">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    {locale === 'pt' ? 'Envio e Devoluções' : 'Shipping and Returns'}
                  </a>
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/payments">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    {locale === 'pt'
                      ? 'Pagamento'
                      : 'Payments'}
                  </a>
                </Link>
              </li>
              <li className="py-3 md:py-0 md:pb-4">
                <Link href="/contacts">
                  <a className="text-primary hover:text-accents-6 transition ease-in-out duration-150">
                    {locale === 'pt' ? 'Contacte-nos' : 'Contact Us'}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <ul className="flex flex-initial flex-col md:flex-1"></ul>
          </div>
          <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary">
            <div className="flex space-x-6 items-center h-10">
              {/* <a href="https://github.com/vercel/commerce" className={s.link}>
                <Github />
              </a> */}
              <I18nWidget />
            </div>
          </div>
        </div>
        <div className="py-12 flex flex-col md:flex-row justify-between items-center space-y-4">
          <div>
            <span>&copy; 2021 Kitbit. All rights reserved.</span>
          </div>
          <div className="flex items-center">
            <span className="text-primary">Crafted by Cottonhat</span>
            <a href="https://cottonhat.net" aria-label="Cottonhat.net Link">
              <img
                src="https://cottonhat.net/images/logo_02.png"
                alt="Cottonhat.net Logo"
                className="inline-block h-6 ml-4 text-primary"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
