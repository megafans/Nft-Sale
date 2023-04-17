/* eslint-disable @next/next/no-img-element */
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import { useAccount } from 'wagmi'
import { ButtonLink, Nft } from '@/components'
import { useMounted, useNFTImages, useBrowser } from '@/hooks'

export const Congratulations = () => {
  const isBrowser = useBrowser()
  const nftsBought = isBrowser ? Number(localStorage.getItem('nftsBought')) : 0
  const { address } = useAccount()
  const nftList = useNFTImages({ address })
  const nftId = nftList.nftList?.slice(-nftsBought)

  const mounted = useMounted()
  const { width, height } = useWindowSize()

  return nftId && mounted ? (
    <>
      {width && <Confetti width={width} height={height} numberOfPieces={100} tweenDuration={10000} />}
      <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
        <ArrowLongLeftIcon className="w-6 h-6 mr-10" />
        <span className="font-bold">Back to profile</span>
      </ButtonLink>
      <h1 className="text-white text-center font-bold text-4xl uppercase mt-20">
        Congratulations you have just bought {nftsBought} NFT, please check details below
      </h1>
      <div className="flex justify-center items-center">
        <p className="text-white text-center font-bold text-xl">
          Details of all NFT&apos;s you can check on profile page
        </p>
        <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
          <ArrowLongRightIcon className="w-6 h-6" />
        </ButtonLink>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        {nftId?.map((nft: { id: any }): any => {
          return nft ? <Nft nft={nft} key={nft.id} /> : null
        })}
      </div>
    </>
  ) : null
}
