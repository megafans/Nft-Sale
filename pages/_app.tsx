import { ReactElement, ReactNode, StrictMode } from 'react'
import { SWRConfig } from 'swr'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { AnimatePresence } from 'framer-motion'

import { Layout, NoAccess } from '@/components'
import { wagmiClient, chains } from '@/utils/wallet-config'

import '@rainbow-me/rainbowkit/styles.css'
import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
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
      <StrictMode>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            showRecentTransactions
            coolMode
            theme={darkTheme({
              accentColor: 'black',
              borderRadius: 'medium',
              overlayBlur: 'large',
            })}
            chains={chains}
            modalSize="wide"
            appInfo={{
              appName: 'MegaFans',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </RainbowKitProvider>
        </WagmiConfig>
      </StrictMode>
    </SWRConfig>
  )
}

export default App
