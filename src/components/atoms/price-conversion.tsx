import { useBuyNFT } from '@/hooks'

type PriceConnversionProps = {
  currency: number
  nftQuantity: string
}

export const PriceConversion = ({ currency, nftQuantity }: PriceConnversionProps) => {
  const { price } = useBuyNFT()
  return (
    <p className="text-xl font-bold text-white mb-4">
      You are going to pay
      <span className="bg-purple p-4 h-4 w-4 rounded-full mx-2">{Number(price) * Number(nftQuantity)}</span>
      ETH (around {currency * Number(price) * Number(nftQuantity)} USD)
    </p>
  )
}
