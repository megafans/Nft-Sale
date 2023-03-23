import cslx from 'clsx'

import { Nft } from '@/components'
import { useBuyNFT } from '@/hooks'

type NftListProps = {
  compact?: boolean
}

export const NftList = ({ compact }: NftListProps) => {
  const { nftIds } = useBuyNFT()

  return (
    <ul
      role="list"
      className={cslx(
        'mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4',
        compact && 'sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
      )}
    >
      {nftIds?.map(nft => {
        return nft ? <Nft nftId={nft.toString()} key={nft.toNumber()} /> : null
      })}
    </ul>
  )
}
