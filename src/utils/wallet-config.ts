import { createConfig, configureChains, mainnet } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { createPublicClient, http } from 'viem'
import { metaMaskWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets'

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

const { chains, webSocketPublicClient } = configureChains([mainnet, goerli], [publicProvider()])

const connectors = connectorsForWallets([
  {
    groupName: 'Popular Wallets',
    wallets: [metaMaskWallet({ chains, shimDisconnect: true }), coinbaseWallet({ appName: 'MegaFans', chains })],
  },
])

const wagmiClient = createConfig({
  logger: {
    warn: console.warn,
  },
  autoConnect: true,
  connectors,
  webSocketPublicClient,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

export { chains, wagmiClient }
