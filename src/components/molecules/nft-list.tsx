/* eslint-disable @next/next/no-img-element */
import React from 'react'

type NftListProps = {
  nftList: {
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
  }[]
}

export const NftList = ({ nftList }: NftListProps) => {
  return (
    <ul
      role="list"
      className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      {nftList.map(nft => (
        <li key={nft.id}>
          <img
            className="aspect-[1/1] w-full rounded-2xl object-cover"
            src={`https://ipfs.io/ipfs${nft.image.replace('ipfs:/', '')}`}
            alt=""
          />
          <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{nft.name}</h3>
          <p className="text-base leading-7 text-white">{nft.description}</p>
        </li>
      ))}
    </ul>
  )
}
