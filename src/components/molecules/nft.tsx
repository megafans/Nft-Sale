import Image from 'next/image'
import { useState, memo, useLayoutEffect } from 'react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { useContractRead } from 'wagmi'

import { ButtonLink, Skeleton } from '@/components'
import { blurDataUrl, nftSmartContractAddress } from '@/helpers/constants'
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

const baseContract: any = {
  address: nftSmartContractAddress,
  abi: ensRegistryABI,
  chainId: 5,
}

const refetchContract = (nftId: string) => ({
  ...baseContract,
  functionName: 'tokenURI',
  scopeKey: nftId,
  args: [Number(nftId)],
  cacheOnBlock: true,
  watch: true,
})

const fetchNFTListData = async (url: string) => {
  const result: NftProps = await fetch(url)
    .then(response => response.json())
    .then(data => data)
  return result
}

const SingleNft = ({ nftId }: { nftId: string }) => {
  const [data, setData] = useState<NFTPayload>()

  const {
    data: nft,
    status,
    refetch,
  } = useContractRead<any, any, any>({
    ...refetchContract(nftId),
    onSuccess(data) {
      fetchNFTListData(data)
        .then(result => {
          setData(result)
        })
        .catch(error => {
          console.error(error)
        })
    },
  })

  useLayoutEffect(() => {
    if (nft) {
      fetchNFTListData(nft)
        .then(result => {
          setData(result)
        })
        .catch(error => {
          console.error(error)
          refetch({
            ...refetchContract(nftId),
          })
        })
    }
  }, [nft, status, refetch, nftId])

  return data ? (
    <li key={data.id}>
      <Image
        className="aspect-[1/1] w-full rounded-2xl object-cover shadow-2xl"
        src={`https://megafans.mypinata.cloud/ipfs${data.image?.replace('ipfs:/', '')}`}
        alt={data.name}
        width={640}
        height={640}
        blurDataURL={blurDataUrl}
        priority
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
  ) : (
    <Skeleton />
  )
}

export const Nft = memo(SingleNft)
