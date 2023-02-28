import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { Suspense, useState } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Button, Modal, NftList, ProfileBanner, ProfileEdit, Spinner } from '@/components'
import { useBuyNFT, useMounted, useUser } from '@/hooks'
import { sendUserWallet } from '@/utils/repository'

export const Profile = () => {
  const { buyNFT, connected, isLoading } = useBuyNFT()
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
  const mounted = useMounted()
  const { openConnectModal } = useConnectModal()

  const { isConnected } = useAccount({
    onConnect({ address, isReconnected }) {
      !isReconnected && sendUserWallet(address)
    },
  })

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
        return <ProfileBanner setEditMode={setEditMode} isEditMode={isEditMode} />
      default:
        null
    }
  }

  return (
    <>
      {getProfileBannerView()}
      <div className="flex flex-col md:flex-row items-center md:justify-evenly mt-14 space-y-8 md:space-y-0">
        <Button type="button" size="lg" variant="primary" onClick={connected ? () => buyNFT() : openConnectModal}>
          Buy NFT with ETH
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>
      <div>
        {isConnected && mounted ? (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <Suspense fallback={<Spinner />}>
                <h1 className="text-2xl font-bold mt-20 text-white">My NFTs:</h1>
                <NftList />
              </Suspense>
            )}
          </>
        ) : (
          <p className="text-2xl font-bold mt-20 text-white text-center">Please connect your wallet to see your NFTs</p>
        )}
      </div>
    </>
  )
}
