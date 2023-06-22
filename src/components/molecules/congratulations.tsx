import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import clsx from 'clsx'
import { useAccount } from 'wagmi'
import Image from 'next/image'

import { ButtonLink, Skeleton, Spinner } from '@/components'
import { useMounted, useNFTImages, useBrowser, useUser } from '@/hooks'
import { blurDataUrl } from '@/helpers/constants'

export const Congratulations = () => {
  const isBrowser = useBrowser()
  const nftsBought = isBrowser ? Number(localStorage.getItem('nftsBought')) : 0
  const { address } = useAccount()
  const { nftFullList, isLoadingFullList } = useNFTImages({ address })
  const nftId = nftFullList?.ownedNfts?.slice(-nftsBought)

  const mounted = useMounted()
  const { width, height } = useWindowSize()
  const { user } = useUser()

  if (isLoadingFullList) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Spinner />
      </div>
    )
  }

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
      <div className="flex flex-col justify-center items-center">
        {!user?.username ? (
          <div className="flex flex-col mt-4 justify-center items-center mx-auto">
            <p className="text-white text-center font-bold text-lg mb-3">
              Lets put your NFTs to use but connecting them to your Megafans account
            </p>
            <ButtonLink href="/sign-up" variant="transparent" size="lg" ribbon>
              <span className="font-bold">Sign Up</span>
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </ButtonLink>
          </div>
        ) : (
          <>
            <p className="text-white text-center font-bold text-xl">
              Details of all NFT&apos;s you can check on profile page
            </p>
            <ButtonLink href="/profile" variant="transparent" size="lg" ribbon>
              <ArrowLongRightIcon className="w-6 h-6" />
            </ButtonLink>
          </>
        )}
      </div>
      <div
        className={clsx(
          nftsBought === 1 && 'flex flex-col md:flex-row justify-center items-center mx-auto max-w-2xl',
          nftsBought === 2 && 'grid grid-cols-1 md:grid-cols-2 gap-8 auto-cols-max px-8',
          nftsBought > 2 && 'grid grid-cols-1 md:grid-cols-3 gap-8 auto-cols-max'
        )}
      >
        {nftId?.map((nft: { rawMetadata: any; descrption: string; title: string; tokenId: any }): any => {
          return nft ? (
            <li key={nft.tokenId}>
              <Image
                className="aspect-[1/1] w-full rounded-2xl object-cover shadow-2xl rotate-1"
                src={`https://megafans.mypinata.cloud/ipfs/${nft.rawMetadata.image.replace('ipfs://', '')}`}
                alt={nft.descrption}
                width={500}
                height={500}
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
              <div className="flex">
                <div className="flex-1">
                  <h3 className="mt-6 text-4xl font-semibold leading-8 tracking-tight text-white">
                    {nft.rawMetadata.id}
                  </h3>
                  <p className="text-4x leading-7 text-white font-semibold">{nft.title}</p>
                </div>
              </div>
            </li>
          ) : (
            <Skeleton />
          )
        })}
      </div>
    </>
  ) : null
}
