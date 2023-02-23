import { ReactElement, ReactNode, StrictMode } from 'react'
import { SWRConfig } from 'swr'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'

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
  console.log('chains', chains)
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
            showRecentTransactions={true}
            coolMode
            theme={darkTheme({
              accentColor: 'black',
              borderRadius: 'medium',
              overlayBlur: 'small',
            })}
            chains={chains}
            modalSize="compact"
            appInfo={{
              appName: 'MegaFans',
            }}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </StrictMode>
    </SWRConfig>
  )
}

export default App
