import { BigNumber } from 'ethers'

import { Nft } from '@/components'
import { useBuyNFT } from '@/hooks'

export const NftList = () => {
  const { nftIds } = useBuyNFT()

  return (
    <ul
      role="list"
      className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
    >
      {(nftIds ? (nftIds as BigNumber[]) : []).map(nft => {
        const nftId = nft.toString()
        return nftId ? <Nft nftId={nftId} key={nftId} /> : null
      })}
    </ul>
  )
}
