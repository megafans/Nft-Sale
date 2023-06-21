import { memo } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { ButtonLink, Skeleton } from '@/components'
import { blurDataUrl } from '@/helpers/constants'

const SingleNft = ({ nft }: any) => {
  return nft ? (
    <li key={nft.id}>
      <Image
        className={`aspect-[1/1] w-full rounded-2xl object-cover shadow-2xl rotate-${nft?.rotate} skew-y-${nft?.rotate}`}
        src={nft.uri}
        alt={nft.name}
        width={500}
        height={500}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
      <div className="flex">
        <div className="flex-1">
          <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{nft.id}</h3>
          <p className="text-base leading-7 text-white">{nft.name}</p>
        </div>
        <ButtonLink href={`/nft/${nft.id}`} variant="transparent" size="sm" ribbon={false}>
          <ArrowLongRightIcon className="w-6 h-6 ml-4" />
        </ButtonLink>
      </div>
    </li>
  ) : (
    <Skeleton />
  )
}

export const Nft = memo(SingleNft)
