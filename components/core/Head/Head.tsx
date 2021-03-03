import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@config/seo.json'

const Head: FC = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
              p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
              };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
              n.src=w;g.parentNode.insertBefore(n,g)}}(window, document, 'script', '//d37nrcy6824ydp.cloudfront.net/sp.js', 'snowplow'));
            `,
          }}
        />
      </NextHead>
    </>
  )
}

export default Head
