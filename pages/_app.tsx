import type { ReactElement, ReactNode } from 'react'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'

import { Layout, NoAccess, ErrorBoundary } from '@/components'
import { wagmiClient, chains } from '@/utils/wallet-config'

import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  if (pageProps.protected && !token) {
    return (
      <Layout>
        <NoAccess />
      </Layout>
    )
  }

  return getLayout(
    <SWRConfig
      value={{
        refreshWhenHidden: true,
        errorRetryCount: 3,
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: 'black',
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}
          chains={chains}
          modalSize="compact"
        >
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  )
}

export default App
