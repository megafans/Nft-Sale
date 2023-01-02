import { useRef } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { EthIcon } from '@/components'

export const ConnectWalletButton = () => {
  const unsupportedChainButtonRef = useRef(null)

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div className="z-10 bg-white/20 px-4 py-2 rounded-lg text-white">
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex items-center justify-between w-32"
                    id="connect-button"
                  >
                    <EthIcon colorClass="fill-red-500" />
                    Connect Wallet
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button ref={unsupportedChainButtonRef} onClick={openChainModal} type="button">
                    <span className="text-red-400">Wrong network</span>
                  </button>
                )
              }

              return (
                <div className="flex gap-3">
                  <button onClick={openAccountModal} className="flex items-center" type="button">
                    {connected && <div className="bg-green-300 w-3 h-3 rounded-full overflow-hidden mr-2"></div>}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
