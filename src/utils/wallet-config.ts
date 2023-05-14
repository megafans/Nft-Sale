import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { configureChains, createClient } from 'wagmi'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'

export type AccountProps = {
  account: {
    address: string
    balanceDecimals?: number
    balanceFormatted?: string
    balanceSymbol?: string
    displayBalance?: string
    displayName: string
    ensAvatar?: string
    ensName?: string
    hasPendingTransactions: boolean
  }
}

const apiKey = '1ycYKWwImku2UgUNYpQ3QPoMS-Rvzjp5'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey, priority: 0, weight: 1 }),
    publicProvider({ weight: 2 }),
    jsonRpcProvider({
      priority: 0,
      rpc: () => ({
        http: 'https://eth-mainnet.g.alchemy.com/v2/1ycYKWwImku2UgUNYpQ3QPoMS-Rvzjp5',
        webSocket: 'wss://eth-mainnet.g.alchemy.com/v2/1ycYKWwImku2UgUNYpQ3QPoMS-Rvzjp5',
      }),
    }),
  ]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true }),
      coinbaseWallet({ appName: 'MegaFans', chains }),
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  logger: {
    warn: console.warn,
  },
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains, wagmiClient }
