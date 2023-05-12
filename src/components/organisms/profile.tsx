import { Suspense, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
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
  const { chain } = useNetwork()

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
        {mounted && totalNfts < 5501 && !chain?.unsupported ? (
          <NftBuyButtons
            onETHPaymentClick={connected ? () => setPaymentModal(!paymentModal) : openConnectModal}
            onCCPaymentClick={connected && address ? () => setWertModalOpen(!wertOpen) : openConnectModal}
            address={address}
          />
        ) : (
          <div>
            <div className="flex flex-col items-center space-y-5">
              <p className="text-2xl font-bold mt-20 text-white text-center max-w-3xl">
                It looks like you switched into unsupported network. Please switch back to Ethereum.
              </p>
              <ConnectButton />
            </div>
          </div>
        )}
      </>

      <div>
        {isConnected && mounted ? (
          <Suspense fallback={<Spinner />}>
            {!chain?.unsupported && mounted && (
              <>
                <NftListHeader compact={compact} setCompact={setCompact} listLenght={nftIds?.length} />
                <NftList compact={compact} />
              </>
            )}
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
