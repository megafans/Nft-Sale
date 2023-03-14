import { Fragment } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { Button, Modal } from '@/components'
import { useBuyNFT, useCurrency } from '@/hooks'

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
  const { buyNFT } = useBuyNFT()
  const { usd } = useCurrency()

  const onModalClose = (modalClose: () => void) => {
    modalClose()
    setNftQuantity('1')
  }

  return (
    <>
      <Modal
        open={wertModalVisibility}
        onClose={() => onModalClose(wertModalClose)}
        title={`You are going to buy ${nftQuantity} NFT${nftQuantity === '1' ? '' : 's'}`}
      >
        <div id="wert-widget" className="w-full h-[800px] mt-4" />
      </Modal>
      <Modal open={paymentModalVisibility} onClose={() => onModalClose(paymentModalClose)} title="Buy NFT">
        <div className="flex flex-col items-center justify-center space-y-6 mt-4">
          <p className="text-xl font-bold text-white">
            You are going to pay
            <span className="bg-purple p-4 h-4 w-4 rounded-full mr-2">{(0.005 * Number(nftQuantity)).toFixed(3)}</span>
            ETH (around {(usd * 0.005 * Number(nftQuantity)).toFixed(2)} USD)
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-white">Choose NFT quantity:</span>
            <input
              className="h-20 w-32 bg-white/10 text-center mt-2 text-3xl font-bold text-white"
              onChange={e => setNftQuantity(e.target.value)}
              value={nftQuantity}
              type="number"
              min="1"
            />
          </div>

          <Button onClick={() => buyNFT()} variant="primary" type="button" size="lg">
            Buy NFT
            <ArrowLongRightIcon className="w-6 h-6 ml-6" />
          </Button>
        </div>
      </Modal>
    </>
  )
}
