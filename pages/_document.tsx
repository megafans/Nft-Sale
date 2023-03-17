import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap" rel="stylesheet" />
    </Head>
    <body>
      <Main />
      <NextScript />
      <div>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N03M151JPT" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-N03M151JPT');
        `}
        </Script>
      </div>
    </body>
  </Html>
)

export default Document
