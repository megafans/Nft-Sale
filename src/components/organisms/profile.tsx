import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { Button, Modal, ProfileBanner, ProfileEdit, BuyNFTModal } from '@/components'
import { useBuyNFT, useMounted, useUser } from '@/hooks'

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
  const { connected } = useBuyNFT()
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
      default:
        return <ProfileBanner setEditMode={setEditMode} isEditMode={isEditMode} />
    }
  }

  return (
    <>
      {mounted && getProfileBannerView()}
      <div className="flex justify-center mt-14">
        <Button type="button" size="lg" variant="primary" onClick={() => setIsOpen(!isOpen)} disabled={!connected}>
          Buy NFT
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>
      <Modal title="Buy NFT" open={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <BuyNFTModal />
      </Modal>
    </>
  )
}
