/* eslint-disable @next/next/no-img-element */
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useEffect, useMemo, useState } from 'react'
import { BigNumber } from 'ethers'
import axios from 'axios'
import { useContractRead } from 'wagmi'

import { ButtonLink, Spinner } from '@/components'
import { useBrowser, useBuyNFT, useMounted } from '@/hooks'
import { fetcher } from '@/utils/fetcher'
import { api } from '@/helpers/api'
import { nftSmartContractAddress } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'

const fetchNFTListData = async (url: string) => {
  const response = await axios.get(url as string)
  const { data } = response
  return data
}

const baseContract: any = {
  address: nftSmartContractAddress,
  abi: ensRegistryABI,
  chainId: 5,
}

export const NftDetailsEntity = ({ nftId }: { nftId: any }) => {
  const isBrowser = useBrowser()
  const token = isBrowser ? localStorage.getItem('token') : null
  const { query } = useRouter()
  const mounted = useMounted()
  const [nft, setData] = useState<any>(null)
  const { data: nftPayload } = useContractRead<any, any, any>({
    ...baseContract,
    functionName: 'tokenURI',
    args: [+nftId.toString()],
  })

  useEffect(() => {
    if (nftPayload) {
      fetchNFTListData(nftPayload).then(setData)
    }
  }, [nftPayload])

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}api/NFT/ListTotalNFTRewards?nftId=${query.id}`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  if (error) {
    return <p className="text-center text-white">Failed to load</p>
  }

  return data && nft ? (
    <>
      <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
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
            <p className="text-base leading-7 text-white">MFAN tokens won: {data?.totalRewards}</p>
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
  const { nftIds } = useBuyNFT()
  const nftId: BigNumber | undefined = useMemo(
    () => nftIds?.find(nft => nft.toString() === query.id),
    [nftIds, query.id]
  )
  return nftId ? <NftDetailsEntity nftId={nftId} /> : <></>
}
