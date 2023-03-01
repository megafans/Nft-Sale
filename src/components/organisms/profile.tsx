import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { Suspense, useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import WertWidget from '@wert-io/widget-initializer'
import { signSmartContractData } from '@wert-io/widget-sc-signer'
import { v4 as uuid } from 'uuid'

import { Button, Modal, NftList, ProfileBanner, ProfileEdit, Spinner } from '@/components'
import { useBuyNFT, useMounted, useUser } from '@/hooks'
import { sendUserWallet } from '@/utils/repository'

export const Profile = () => {
  const { buyNFT, connected, isLoading } = useBuyNFT()
  const [isEditMode, setEditMode] = useState(false)
  const { user } = useUser()
  const mounted = useMounted()
  const { openConnectModal } = useConnectModal()

  const { isConnected, address } = useAccount({
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

  const signedData = signSmartContractData(
    {
      address: address!,
      commodity: 'ETH',
      commodity_amount: 0.00000001,
      pk_id: 'key1',
      sc_address: '0x0F006A670651F0A5d1677b680ad8Aa0b72FE60B0',
      sc_id: uuid(),
      sc_input_data: '0c1a3f6ff5436d7412a02b198e52fa0b677f8aec99fae81f38a78ba03631ecaf',
    },
    '0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3'
  )

  const wertWidget = new WertWidget({
    ...signedData,
    partner_id: '01GKW611J71EF5B8H9MS00G6M4',
    container_id: 'wert-widget',
    click_id: uuid(),
    commodities: 'ETH:Ethereum-Goerli,MATIC:Polygon',
    lang: 'en',
    origin: 'https://sandbox.wert.io',
    theme: 'dark',
    autosize: true,
  })

  return (
    <>
      {getProfileBannerView()}
      <div className="flex flex-col md:flex-row items-center md:justify-evenly mt-14 space-y-8 md:space-y-0">
        <Button type="button" size="lg" variant="primary" onClick={connected ? () => buyNFT() : openConnectModal}>
          Buy NFT with ETH
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>

        <Button type="button" size="lg" variant="primary" onClick={() => wertWidget.open()}>
          Buy NFT with CC
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
          <div className="flex flex-col items-center space-y-5">
            <p className="text-2xl font-bold mt-20 text-white text-center">
              Please connect your wallet to see your NFTs
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
      <div id="wert-widget" />
    </>
  )
}
