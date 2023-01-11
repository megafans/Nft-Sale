import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { Button, Modal, ProfileBanner, ProfileEdit, BuyNFTModal } from '@/components'
import { useBuyNFT, useUser } from '@/hooks'

export const Profile = () => {
  const [isETHPaymentModalOpen, setETHPaymentModalOpen] = useState(false)
  const [isCreditCardPaymentModalOpen, setCreditCardPaymentModalOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
  const { connected } = useBuyNFT()

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
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={() => setETHPaymentModalOpen(!isETHPaymentModalOpen)}
          disabled={!connected}
        >
          Buy NFT with ETH
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={() => setCreditCardPaymentModalOpen(!isCreditCardPaymentModalOpen)}
          disabled={isCreditCardPaymentModalOpen}
        >
          Buy NFT with Credit Card
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>

      {isETHPaymentModalOpen && (
        <Modal
          title="Buy NFT with ETH"
          open={isETHPaymentModalOpen}
          onClose={() => setETHPaymentModalOpen(!isETHPaymentModalOpen)}
        >
          <BuyNFTModal />
        </Modal>
      )}

      {isCreditCardPaymentModalOpen && (
        <Modal
          title="Buy NFT with Credit Card"
          open={isCreditCardPaymentModalOpen}
          onClose={() => setCreditCardPaymentModalOpen(!isCreditCardPaymentModalOpen)}
        >
          <BuyNFTModal />
        </Modal>
      )}
    </>
  )
}
