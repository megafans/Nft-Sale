/* eslint-disable @next/next/no-img-element */
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useMemo } from 'react'

import { ButtonLink } from '@/components'
import { useBuyNFT, useMounted } from '@/hooks'
import { fetcher } from '@/utils/fetcher'
import { api } from '@/helpers/api'

export const NFTDetails = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const { query } = useRouter()
  const { nftList } = useBuyNFT()
  const mounted = useMounted()

  const [nft] = useMemo(() => nftList?.filter(nft => nft?.id === query.id), [nftList, query.id])

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}api/NFT/ListTotalNFTRewards?nftId=${query.id}`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  if (error) {
    return <p className="text-center text-white">Failed to load</p>
  }

  return (
    <>
      <ButtonLink href="/profile" variant="transparent" size="lg">
        <ArrowLongLeftIcon className="w-6 h-6 mr-10" />
        <span className="font-bold">Back to profile</span>
      </ButtonLink>
      <h1 className="text-white text-center font-bold text-4xl uppercase my-20">Your NFT details</h1>
      <div className="flex flex-col md:flex-row mt-14">
        <div className="w-1/2">
          <img
            className="aspect-[1/1] w-full rounded-2xl object-cover md:-rotate-6"
            src={`https://ipfs.io/ipfs${nft?.image.replace('ipfs:/', '')}`}
            alt=""
          />
        </div>
        {!isLoading && mounted && (
          <div className="w-1/2 flex flex-col text-center items-end justify-start space-y-5">
            <h3 className="text-lg font-semibold tracking-tight text-white">{nft?.name}</h3>
            <p className="text-base leading-7 text-white">{nft?.description}</p>
            <p className="text-base leading-7 text-white">value: {data?.dollarValue}</p>
          </div>
        )}
      </div>
    </>
  )
}
