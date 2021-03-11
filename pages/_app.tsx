import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import type { AppProps } from 'next/app'

import { ManagedUIContext } from '@components/ui/context'
import { Head } from '@components/core'

const Noop: FC = ({ children }) => <>{children}</>

declare global {
  interface Window {
    snowplow: any
  }
}

function FacebookPixel() {
  const router = useRouter()

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('201854665067073');
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  });
  return null;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <FacebookPixel />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
