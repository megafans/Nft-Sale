import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components'

type NftBuyButtonsProps = {
  onETHPaymentClick?: () => void
  onCCPaymentClick?: () => void
}

export const NftBuyButtons = ({ onETHPaymentClick, onCCPaymentClick }: NftBuyButtonsProps) => (
  <div className="flex flex-col md:flex-row items-start md:justify-evenly mt-20 space-y-8 md:space-y-0">
    <div>
      <Button type="button" size="lg" variant="primary" onClick={onETHPaymentClick}>
        Buy NFT with ETH
        <ArrowLongRightIcon className="w-6 h-6 ml-10" />
      </Button>
    </div>

    <div className="-mt-10">
      <Button type="button" size="lg" variant="primary" onClick={onCCPaymentClick}>
        Buy NFT with CC
        <ArrowLongRightIcon className="w-6 h-6 ml-10" />
      </Button>
    </div>
  </div>
)
