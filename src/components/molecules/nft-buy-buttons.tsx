import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components'
import { useBuyNFT } from '@/hooks'

type NftBuyButtonsProps = {
  onETHPaymentClick?: () => void
  onCCPaymentClick?: () => void
  address?: `0x${string}`
}

export const NftBuyButtons = ({ onETHPaymentClick, onCCPaymentClick }: NftBuyButtonsProps) => {
  const { isPaused } = useBuyNFT()

  return (
    <>
      {isPaused ? (
        <div className="flex flex-col md:flex-row items-start md:justify-evenly mt-4 space-y-8 md:space-y-0">
          <p className="text-2xl font-bold mt-20 text-white text-center max-w-3xl">
            The NFT sale is not currently open
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start md:justify-evenly mt-20 space-y-8 md:space-y-0">
          <div>
            <Button type="button" size="lg" variant="primary" onClick={onETHPaymentClick} disabled={isPaused}>
              Buy NFT with ETH
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </Button>
          </div>

          <div className="-mt-10">
            <Button type="button" size="lg" variant="primary" onClick={onCCPaymentClick} disabled={isPaused}>
              Buy NFT with CC
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
