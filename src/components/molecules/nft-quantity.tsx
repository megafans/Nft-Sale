import { useNFTPrice } from '@/hooks'

type NFTQuantityProps = {
  nftQuantity: string
  setNftQuantity: (value: string) => void
}

export const NFTQuantity = ({ nftQuantity, setNftQuantity }: NFTQuantityProps) => {
  const { maxNfts, totalNfts } = useNFTPrice()

  return (
    <div className="flex">
      <div className="flex flex-col mt-4 w-full justify-between">
        <p className="text-white text-center">Check how many nfts you want to buy:</p>
        <input
          className="h-16 w-24 bg-white/10 text-center mt-2 text-3xl font-bold text-white m-auto"
          onChange={e => setNftQuantity(e.target.value)}
          value={nftQuantity}
          type="number"
          min="1"
          max={maxNfts - totalNfts}
        />
      </div>
    </div>
  )
}
