import { mainnet, polygon } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

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

const apiKey = '0xC115c36d2ed62aE7117f7A649B88c53a18D9BB25'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon],
  [
    infuraProvider({ apiKey, priority: 0 }),
    jsonRpcProvider({
      priority: 0,
      rpc: chain => ({
        http: `https://${chain.id}.infura.io/v3/0xC115c36d2ed62aE7117f7A649B88c53a18D9BB25`,
        webSocket: `wss://${chain.id}.infura.io/v3/0xC115c36d2ed62aE7117f7A649B88c53a18D9BB25`,
      }),
    }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'web3-react-demo',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains, wagmiClient }
