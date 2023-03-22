/* eslint-disable @next/next/no-img-element */
import { memo } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { ButtonLink, Skeleton } from '@/components'

const CID = 'QmP5ehuisBJFomF5ZBrML2CeJiGZADFtvb2iGtXe5NqVbd'

const SingleNft = ({ nftId }: { nftId: string }) => {
  return nftId ? (
    <li key={nftId}>
      <img
        className="aspect-[1/1] w-full rounded-2xl object-cover shadow-2xl"
        src={`https://megafans.mypinata.cloud/ipfs/${CID}/${nftId}.png`}
        alt={nftId}
      />
      <div className="flex">
        <div className="flex-1">
          <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{nftId}</h3>
          <p className="text-base leading-7 text-white">Megafans Gamer Girlz</p>
        </div>
        <ButtonLink href={`/nft/${nftId}`} variant="transparent" size="sm" ribbon={false}>
          <ArrowLongRightIcon className="w-6 h-6 ml-4" />
        </ButtonLink>
      </div>
    </li>
  ) : (
    <Skeleton />
  )
}

export const Nft = memo(SingleNft)
