/* eslint-disable @next/next/no-img-element */

import axios from 'axios'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useContractRead } from 'wagmi'

import { ButtonLink } from '@/components'
import { useBuyNFT } from '@/hooks'
import { nftSmartContractAddress } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'

type NftProps = {
  id: string
  name: string
  description: string
  image: string
  edition: number
  date: number
  compiler?: string
  attributes?: {
    trait_type: string
    value: string
  }[]
}

const fetchNFTListData = async (url: string) => {
  const result: NftProps = await axios
    .get(url as string)
    .then(response => response)
    .then(({ data }) => data)
  return result
}

const baseContract: any = {
  address: nftSmartContractAddress,
  abi: ensRegistryABI,
  chainId: 5,
}
export const Nft = ({ nftId }: { nftId: any }) => {
  const [data, setData] = useState<any>(null)
  const { data: nft, isError } = useContractRead<any, any, any>({
    ...baseContract,
    functionName: 'tokenURI',
    args: [+nftId],
  })
  useEffect(() => {
    if (nft) {
      fetchNFTListData(nft).then(setData)
    }
  }, [nft])
  return data ? (
    <li key={data.id}>
      <img
        className="aspect-[1/1] w-full rounded-2xl object-cover"
        src={`https://ipfs.io/ipfs${data.image.replace('ipfs:/', '')}`}
        alt=""
      />
      <div className="flex">
        <div className="flex-1">
          <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{data.name}</h3>
          <p className="text-base leading-7 text-white">{data.description}</p>
        </div>
        <ButtonLink href={`/nft/${data.id}`} variant="transparent" size="sm">
          <ArrowLongRightIcon className="w-6 h-6 ml-4" />
        </ButtonLink>
      </div>
    </li>
  ) : (
    <></>
  )
}

export const NftList = () => {
  const { nftIds } = useBuyNFT()
  return (
    <ul
      role="list"
      className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      {(nftIds ? (nftIds as BigNumber[]) : []).map(nft => {
        const nftId = nft.toString()
        return nftId ? <Nft nftId={nftId} key={nftId} /> : <></>
      })}
    </ul>
  )
}
