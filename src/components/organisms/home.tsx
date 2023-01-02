import Image from 'next/image'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { ButtonLink } from '@/components'
import { useUser } from '@/hooks'
import { blurDataUrl } from '@/helpers/constants'

export const Home = () => {
  const { user } = useUser()

  return (
    <main className="lg:relative">
      <div className="w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 sm:px-8 lg:w-5/12 xl:pr-16">
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Buy an NFT</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-white sm:text-xl md:mt-5 md:max-w-3xl">
            Buy a MegaFans NFT and begin earning recurring revenue instantly
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <ButtonLink size="lg" variant="primary" href={user?.username ? '/profile' : '/sign-in'}>
              Buy NFT
              <ArrowLongRightIcon className="w-6 h-6 ml-10" />
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-7/12 hidden md:block">
        <Image
          className="absolute inset-0 h-full w-full object-contain"
          height={400}
          width={400}
          src="/hero-home.svg"
          alt="Buy NFT"
          blurDataURL={blurDataUrl}
          priority
        />
      </div>
    </main>
  )
}
