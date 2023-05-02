type PriceConnversionProps = {
  currency: number
  nftQuantity: string
}

export const PriceConversion = ({ currency, nftQuantity }: PriceConnversionProps) => {
  return (
    <p className="text-xl font-bold text-white mb-4">
      You are going to pay
      <span className="bg-purple p-4 h-4 w-4 rounded-full mx-2">{(0.0033 * Number(nftQuantity)).toFixed(4)}</span>
      ETH (around {(currency * 0.0033 * Number(nftQuantity)).toFixed(2)} USD)
    </p>
  )
}
