import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useContractRead } from 'wagmi'

import { Button } from '@/components'
import { ensRegistryABI } from '@/utils/abi'

type NftBuyButtonsProps = {
  onETHPaymentClick?: () => void
  onCCPaymentClick?: () => void
  address?: `0x${string}`
}

export const NftBuyButtons = ({ onETHPaymentClick, onCCPaymentClick, address }: NftBuyButtonsProps) => {
  const { status } = useContractRead({
    address,
    abi: ensRegistryABI,
  })

  return (
    <div className="flex flex-col md:flex-row items-start md:justify-evenly mt-20 space-y-8 md:space-y-0">
      <div>
        <Button type="button" size="lg" variant="primary" onClick={onETHPaymentClick} disabled={status !== 'success'}>
          Buy NFT with ETH
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>

      <div className="-mt-10">
        <Button type="button" size="lg" variant="primary" onClick={onCCPaymentClick} disabled={status !== 'success'}>
          Buy NFT with CC
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </Button>
      </div>
    </div>
  )
}
