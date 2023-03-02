import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useBalance, useNetwork } from 'wagmi'

import { Avatar, Balance } from '@/components'
import { useMounted, useUser } from '@/hooks'
import { blurDataUrl } from '@/helpers/constants'

type ProfileBannerProps = {
  isEditMode: boolean
  setEditMode: (value: boolean) => void
}

export const ProfileBanner = ({ isEditMode, setEditMode }: ProfileBannerProps) => {
  const { isLoading } = useUser()
  const mounted = useMounted()
  const { chain } = useNetwork()

  const connected = mounted && !isLoading && chain

  const { data } = useBalance({
    address: '0xDE2F85d79825a5d0e823Ba0D733A37C3299Bc005',
  })

  return (
    <div className="relative">
      <div className="mx-auto max-w-auto">
        <div className="relative shadow-2xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full object-fill md:object-cover"
              width={1400}
              height={440}
              src="/profile.png"
              alt="Profile banner"
              blurDataURL={blurDataUrl}
            />
            <div className="absolute inset-0 mix-blend-multiply" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-5 md:p-10">
            <div className="flex items-start justify-center md:justify-start w-full md:h-40 col order-1">
              {connected && <ConnectButton showBalance={false} chainStatus="full" />}
              {connected && <span className="text-black">{data?.formatted}</span>}
            </div>
            <div className="flex items-start justify-center md:justify-end w-full md:h-40 z-10 order-2">
              <div
                className="inline-flex cursor-pointer py-2 px-4 bg-purple/60 rounded-lg"
                onClick={() => setEditMode(!isEditMode)}
              >
                <p className="text-base text-white font-medium">Edit profile:</p>
                <PencilSquareIcon className="text-white h-6 w-6 ml-2" />
              </div>
            </div>
            <div className="flex items-end justify-center md:justify-start w-full md:h-40 order-last md:order-3">
              <Avatar />
            </div>
            <div className="flex items-center md:mt-4 justify-center md:justify-end w-full md:h-40 order-4">
              <Balance />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
