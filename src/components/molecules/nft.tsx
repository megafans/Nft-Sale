/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { useEffect, useState, memo } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useContractRead } from 'wagmi'

import { ButtonLink } from '@/components'
import { nftSmartContractAddress } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'
import { NFTPayload } from '@/types/nft'

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
    .get(url)
    .then(response => response)
    .then(({ data }) => data)
  return result
}

const baseContract: any = {
  address: nftSmartContractAddress,
  abi: ensRegistryABI,
  chainId: 5,
}

const SingleNft = ({ nftId }: { nftId: string }) => {
  const [data, setData] = useState<NFTPayload>()
  const { data: nft } = useContractRead<any, any, any>({
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
        className="aspect-[1/1] w-full rounded-2xl object-cover shadow-2xl"
        src={`https://ipfs.io/ipfs${data.image.replace('ipfs:/', '')}`}
        alt=""
      />
      <div className="flex">
        <div className="flex-1">
          <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{data.name}</h3>
          <p className="text-base leading-7 text-white">{data.description}</p>
        </div>
        <ButtonLink href={`/nft/${data.id}`} variant="transparent" size="sm" ribbon={false}>
          <ArrowLongRightIcon className="w-6 h-6 ml-4" />
        </ButtonLink>
      </div>
    </li>
  ) : null
}

export const Nft = memo(SingleNft)
