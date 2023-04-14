/* eslint-disable @next/next/no-img-element */
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import { useAccount } from 'wagmi'
import { ButtonLink } from '@/components'
import { useMounted, useNFTImages } from '@/hooks'
import { imageCID } from '@/helpers/constants'

export const Congratulations = () => {
  const { address } = useAccount()
  const nftList = useNFTImages({ address })
  const nftId = nftList.nftList?.slice(-1)

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
          src={`https://megafans.mypinata.cloud/ipfs/${imageCID}/${nftId.toString()}.png`}
          alt="NFT"
        />
      </div>
      <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white text-center">{nftId.toString()}</h3>
      <p className="text-base leading-7 text-white text-center">Megafans Gamer Girlz</p>
    </>
  ) : null
}
