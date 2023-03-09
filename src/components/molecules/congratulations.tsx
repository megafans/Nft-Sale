/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useContractRead } from 'wagmi'
import { useState, useEffect } from 'react'

import { ButtonLink } from '@/components'
import { useBuyNFT, useMounted } from '@/hooks'
import { nftSmartContractAddress } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'

import type { NFTPayload } from '@/types/nft'

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

export const Congratulations = () => {
  const { nftIds } = useBuyNFT()
  const nftId = nftIds?.slice(-1)
  const [nft, setData] = useState<NFTPayload>()
  const { data: nftPayload } = useContractRead<any, any, any>({
    ...baseContract,
    functionName: 'tokenURI',
    args: [nftId ? +nftId?.toString() : ''],
  })

  const mounted = useMounted()
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (nftPayload) {
      fetchNFTListData(nftPayload).then(setData)
    }
  }, [nftPayload])

  return nft ? (
    <>
      {width && mounted && <Confetti width={width} height={height} numberOfPieces={100} tweenDuration={10000} />}
      <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
        <ArrowLongLeftIcon className="w-6 h-6 mr-10" />
        <span className="font-bold">Back to profile</span>
      </ButtonLink>
      <h1 className="text-white text-center font-bold text-4xl uppercase mt-20">
        Congratulations you have just bought NFT, please check details below
      </h1>
      <div className="flex justify-center items-center">
        <p className="text-white text-center font-bold text-xl">
          Details of all NFT&apos;s you can check on profile page
        </p>
        <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
          <ArrowLongRightIcon className="w-6 h-6" />
        </ButtonLink>
      </div>
      <div className="flex justify-center pt-20">
        <img
          className="aspect-[1/1] w-80 rounded-2xl object-cover"
          src={`https://ipfs.io/ipfs${nft?.image?.replace('ipfs:/', '')}`}
          alt="NFT"
        />
      </div>
      <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white text-center">{nft?.name}</h3>
      <p className="text-base leading-7 text-white text-center">{nft?.description}</p>
    </>
  ) : null
}
