import { Fragment } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, Modal } from '@/components'
import { useBuyNFT } from '@/hooks'

type PaymentModalsProps = {
  wertModalVisibility: boolean
  paymentModalVisibility: boolean
  nftQuantity: string
  setNftQuantity: (value: string) => void
  wertModalClose: () => void
  paymentModalClose: () => void
}

export const PaymentModals = ({
  wertModalVisibility,
  paymentModalVisibility,
  wertModalClose,
  paymentModalClose,
  nftQuantity,
  setNftQuantity,
}: PaymentModalsProps) => {
  const { buyNFT } = useBuyNFT(nftQuantity)
  return (
    <>
      <Modal open={wertModalVisibility} onClose={wertModalClose} title="Buy nft using credit card payment">
        <div id="wert-widget" className="w-full h-[800px] mt-4" />
      </Modal>
      <Modal open={paymentModalVisibility} onClose={paymentModalClose} title="Buy NFT">
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
