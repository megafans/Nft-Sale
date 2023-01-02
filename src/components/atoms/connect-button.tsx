import { useRef } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
                    <svg
                      className="w-3 fill-red-500"
                      viewBox="0 0 12 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 10L6 0L12 10L6 14L0 10Z" />
                      <path d="M0 11.5L6 15.5L12 11.5L6 20L0 11.5Z" />
                    </svg>
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
