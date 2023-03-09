import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { Suspense, Fragment, useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, Modal, NftList, MemoizedProfileBanner, ProfileEdit, Spinner } from '@/components'
import { useBuyNFT, useMounted, useUser, useWertPayment } from '@/hooks'
import { sendUserWallet } from '@/utils/repository'

export const Profile = () => {
  const [wertOpen, setWertOpen] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)
  const [nftQuantity, setNftQuantity] = useState('1')
  const { buyNFT, connected, isLoading } = useBuyNFT(nftQuantity)
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
  const mounted = useMounted()
  const { openConnectModal } = useConnectModal()

  const { isConnected, address } = useAccount({
    onConnect({ address, isReconnected }) {
      !isReconnected && sendUserWallet(address)
    },
  })

  const wertWidget = useWertPayment({ address })

  const getProfileBannerView = () => {
    switch (isEditMode) {
      case true:
        return (
          <Modal
            open={isEditMode}
            title={`You are going to edit ${user?.username} profile`}
            onClose={() => setEditMode(!isEditMode)}
          >
            <ProfileEdit />
          </Modal>
        )
      case false:
        return <MemoizedProfileBanner setEditMode={setEditMode} isEditMode={isEditMode} />
      default:
        null
    }
  }

  const handleWertWidget = () => {
    setWertOpen(!wertOpen)
    setTimeout(() => {
      wertWidget.mount()
    }, 500)
  }

  return (
    <>
      {getProfileBannerView()}
      <div className="flex flex-col md:flex-row items-start md:justify-evenly mt-20 space-y-8 md:space-y-0">
        <div>
          <Button
            type="button"
            size="lg"
            variant="primary"
            onClick={connected ? () => setPaymentModal(!paymentModal) : openConnectModal}
          >
            Buy NFT with ETH
            <ArrowLongRightIcon className="w-6 h-6 ml-10" />
          </Button>
        </div>

        <div className="-mt-10">
          <Button type="button" size="lg" variant="primary" onClick={handleWertWidget}>
            Buy NFT with CC
            <ArrowLongRightIcon className="w-6 h-6 ml-10" />
          </Button>
        </div>
      </div>
      <div>
        {isConnected && mounted ? (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <Suspense fallback={<Spinner />}>
                <h1 className="text-3xl font-black mt-20 text-white underline decoration-current underline-offset-8">
                  My NFTs
                </h1>
                <NftList />
              </Suspense>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center space-y-5">
            <p className="text-2xl font-bold mt-20 text-white text-center">
              Please connect your wallet to see your NFTs
            </p>
            <ConnectButton />
          </div>
        )}
      </div>

      <Modal open={wertOpen} onClose={() => setWertOpen(!wertOpen)} title="Buy nft using credit card payment">
        <div id="wert-widget" className="w-full h-[800px] mt-4" />
      </Modal>
      <Modal open={paymentModal} onClose={() => setPaymentModal(false)} title="Buy NFT">
        <div className="flex flex-col items-center justify-center space-y-6 mt-4">
          <span className="text-white">Choose NFT quantity:</span>
          <input
            className="h-20 w-32 bg-white/10 text-center mt-2 text-3xl font-bold text-white"
            onChange={e => setNftQuantity(e.target.value)}
            value={nftQuantity}
            type="number"
            min="1"
          />
          <Button onClick={() => buyNFT()} variant="primary" type="button" size="lg">
            Buy NFT
            <ArrowLongRightIcon className="w-6 h-6 ml-6" />
          </Button>
        </div>
      </Modal>
    </>
  )
}
