import numbro from 'numbro'

import { useBuyNFT } from '@/hooks'

type PriceConnversionProps = {
  currency: number
  nftQuantity: string
}

export const PriceConversion = ({ currency, nftQuantity }: PriceConnversionProps) => {
  const { price } = useBuyNFT()
  const formatedPrice = numbro(Number(price) * Number(nftQuantity)).format({ mantissa: 16 })

  return (
    <p className="text-xl font-bold text-white mb-4">
      You are going to pay
      <span className="bg-purple p-4 h-4 w-4 rounded-full mx-2">{formatedPrice}</span>
      ETH (
      {Number(currency * Number(price) * Number(nftQuantity)) < 1
        ? 'below 1 USD'
        : `${currency * Number(price) * Number(nftQuantity)} USD`}
      )
    </p>
  )
}
