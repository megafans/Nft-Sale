import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import { Button, Modal, NftList, ProfileBanner, ProfileEdit } from '@/components'
import { useBuyNFT, useMounted, useUser } from '@/hooks'

export const Profile = () => {
  const { buyNFT, connected, nftList, nftListLoading } = useBuyNFT()
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
  const { isConnected } = useAccount()
  const mounted = useMounted()

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

  console.log('nftList', nftList)

  return (
    <>
      {getProfileBannerView()}
      <div className="flex flex-col md:flex-row items-center md:justify-evenly mt-14 space-y-8 md:space-y-0">
        <Button type="button" size="lg" variant="primary" onClick={() => buyNFT()} disabled={!connected}>
          Buy NFT with ETH
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>
      <div>
        {isConnected && mounted ? (
          <>
            {nftListLoading && <p className="text-white">Loading...</p>}
            <h1 className="text-2xl font-bold mt-20 text-white">My NFTs:</h1>
            <NftList nftList={nftList} />
          </>
        ) : (
          <p className="text-2xl font-bold mt-20 text-white text-center">Please connect your wallet to see your NFTs</p>
        )}
      </div>
    </>
  )
}
