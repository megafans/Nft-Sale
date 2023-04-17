import { Suspense, useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useRecoilState } from 'recoil'

import {
  Modal,
  NftList,
  MemoizedProfileBanner,
  ProfileEdit,
  Spinner,
  NftBuyButtons,
  PaymentModals,
  NftListHeader,
} from '@/components'
import { useBuyNFT, useMounted, useUser } from '@/hooks'
import { sendUserWallet } from '@/utils/repository'
import { nftPaymentAtom } from '@/state/atoms'

export const Profile = () => {
  const [isEditMode, setEditMode] = useState(false)
  const [wertOpen, setWertModalOpen] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)
  const [compact, setCompact] = useState(false)
  const [nftQuantity, setNftQuantity] = useRecoilState(nftPaymentAtom)
  const { openConnectModal } = useConnectModal()

  const mounted = useMounted()
  const { user } = useUser()
  const { nftIds, connected, totalNfts } = useBuyNFT()

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
        return <MemoizedProfileBanner setEditMode={setEditMode} isEditMode={isEditMode} />
      default:
        null
    }
  }

  return (
    <>
      {getProfileBannerView()}
      <>
        {totalNfts < 5501 ? (
          <NftBuyButtons
            onETHPaymentClick={connected ? () => setPaymentModal(!paymentModal) : openConnectModal}
            onCCPaymentClick={connected && address ? () => setWertModalOpen(!wertOpen) : openConnectModal}
            address={address}
          />
        ) : (
          <div className="flex items-center justify-center bg-purple/20 backdrop-blur-md rounded-lg mt-10 p-8">
            <p className="text-2xl font-bold text-white text-center uppercase">Sorry all the NFTs have been sold</p>
          </div>
        )}
      </>

      <div>
        {isConnected && mounted ? (
          <Suspense fallback={<Spinner />}>
            <NftListHeader compact={compact} setCompact={setCompact} listLenght={nftIds?.length} />
            <NftList compact={compact} />
          </Suspense>
        ) : (
          <div className="flex flex-col items-center space-y-5">
            <p className="text-2xl font-bold mt-20 text-white text-center">
              Please connect your wallet to see your NFTs
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
      <PaymentModals
        nftQuantity={nftQuantity}
        setNftQuantity={setNftQuantity}
        wertModalVisibility={wertOpen}
        paymentModalVisibility={paymentModal}
        wertModalClose={() => setWertModalOpen(!wertOpen)}
        paymentModalClose={() => setPaymentModal(!paymentModal)}
      />
    </>
  )
}
