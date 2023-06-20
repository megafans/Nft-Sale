import cslx from 'clsx'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'

import { Nft } from '@/components'
import { useBrowser, useNFTImages } from '@/hooks'

type NftListProps = {
  compact?: boolean
}

export const NftList = ({ compact }: NftListProps) => {
  const { address } = useAccount()
  const nftList = useNFTImages({ address })
  const isBrowser = useBrowser()

  useEffect(() => {
    if (nftList.nftList?.length) {
      isBrowser && localStorage.setItem('nftsListLenght', nftList.nftList.length)
    }
  }, [isBrowser, nftList.nftList?.length])

  return (
    <ul
      role="list"
      className={cslx(
        'mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4',
        compact && 'sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
      )}
    >
      {nftList.nftList?.map((nft: { id: any }): any => {
        return nft ? <Nft nft={nft} key={nft.id} /> : null
      })}
    </ul>
  )
}
