/* eslint-disable @next/next/no-img-element */
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useMemo } from 'react'

import { useAccount } from 'wagmi'
import { ButtonLink, NftRewardsList, Spinner } from '@/components'
import { useBrowser, useMounted, useNFTImages, useUser } from '@/hooks'
import { fetcher } from '@/utils/fetcher'
import { api } from '@/helpers/api'

type NftType = {
  id: string
}

export const NftDetailsEntity = ({ nftId }: { nftId: any }) => {
  const isBrowser = useBrowser()
  const token = isBrowser ? localStorage.getItem('token') : null
  const { query } = useRouter()
  const mounted = useMounted()

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}api/NFT/ListTotalNFTRewards?nftId=${query.id}`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  if (error) {
    return <p className="text-center text-white">Failed to load</p>
  }

  return nftId ? (
    <>
      <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
        <ArrowLongLeftIcon className="w-6 h-6 mr-10" />
        <span className="font-bold">Back to profile</span>
      </ButtonLink>
      <h1 className="text-white text-center font-bold text-4xl uppercase my-20">Your NFT details</h1>
      <div className="flex flex-col md:flex-row mt-14">
        <div className="w-1/2">
          <img className="aspect-[1/1] w-full rounded-2xl object-cover md:-rotate-6" src={nftId.uri} alt={nftId.name} />
        </div>
        {!isLoading && mounted && (
          <div className="w-1/2 flex flex-col text-center items-center justify-start space-y-5">
            <h3 className="text-7xl font-bold text-white">{nftId.id}</h3>
            <p className="text-2xl leading-7 text-white">{nftId.name}</p>
            {data && (
              <>
                <p className="text-base leading-7 text-white">value: {data?.dollarValue}</p>
                <p className="text-base leading-7 text-white">MFAN tokens won: {data?.totalRewards}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <Spinner />
  )
}

export const NFTDetails = () => {
  const { query } = useRouter()
  const { address } = useAccount()
  const nftList = useNFTImages({ address })
  const { user } = useUser()
  const nftId = useMemo(() => nftList.nftList?.find((nft: NftType) => nft.id === query.id), [nftList, query.id])

  return nftId ? (
    <>
      <NftDetailsEntity nftId={nftId} />
      {user?.username ? (
        <NftRewardsList nftId={query.id} />
      ) : (
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/sign-in" variant="primary" size="lg" ribbon>
            <span>Connect to megafans account</span>
            <ArrowLongRightIcon className="w-6 h-6 ml-10" />
          </ButtonLink>
        </div>
      )}
    </>
  ) : null
}
