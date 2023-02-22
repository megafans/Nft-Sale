import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import WertModule from '@wert-io/module-react-component'
import { useAccount } from 'wagmi'
import { v4 as uuid } from 'uuid'

import { Button, Modal, ProfileBanner, ProfileEdit, BuyNFTModal } from '@/components'
import { useBuyNFT, useUser, useMounted } from '@/hooks'

export const Profile = () => {
  const { buyNFT, connected, nftList } = useBuyNFT()
  const { address } = useAccount()
  const [isETHPaymentModalOpen, setETHPaymentModalOpen] = useState(false)
  const [isCreditCardPaymentModalOpen, setCreditCardPaymentModalOpen] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
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
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={() => setCreditCardPaymentModalOpen(!isCreditCardPaymentModalOpen)}
          disabled={!connected}
        >
          Buy NFT with Credit Card
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>

      <div className="flex justify-center items-center mt-12">
        {mounted && isCreditCardPaymentModalOpen && (
          <WertModule
            options={{
              partner_id: '01GKW611J71EF5B8H9MS00G6M4',
              container_id: 'widget',
              origin: 'https://sandbox.wert.io',
              width: 400,
              height: 580,
              theme: 'dark',
              lang: 'en',
              color_background: '#350a44',
              color_buttons: '#EE194B',
              buttons_border_radius: '40',
              color_buttons_text: '#f9fafb',
              color_main_text: '#f9fafb',
              color_secondary_text: '#f9fafb',
              color_icons: '#f9fafb',
              commodities: 'ETH:Ethereum-Goerli,MATIC:Polygon',
              click_id: uuid(),
              onReady: () => {
                console.log('Wert Widget is ready')
              },
              extra: {
                wallets: [{ address: address, name: 'MetaMask' }],
              },
            }}
          />
        )}
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
    </>
  )
}
