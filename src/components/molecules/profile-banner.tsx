import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import { Avatar, Balance, ConnectWalletButton } from '@/components'
import { useMounted, useUser } from '@/hooks'
import { blurDataUrl } from '@/helpers/constants'

type ProfileBannerProps = {
  isEditMode: boolean
  setEditMode: (value: boolean) => void
}

export const ProfileBanner = ({ isEditMode, setEditMode }: ProfileBannerProps) => {
  const { isLoading } = useUser()
  const mounted = useMounted()

  return (
    <div className="relative">
      <div className="mx-auto max-w-auto">
        <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full object-cover"
              width={1400}
              height={440}
              src="/profile.svg"
              alt="Profile banner"
              blurDataURL={blurDataUrl}
            />
            <div className="absolute inset-0 mix-blend-multiply" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-5 md:p-10">
            <div className="flex items-start justify-center md:justify-start w-full md:h-40">
              <div
                className="inline-flex cursor-pointer py-2 px-4 bg-white/20 rounded-lg"
                onClick={() => setEditMode(!isEditMode)}
              >
                <p className="text-base text-white font-medium">Edit profile:</p>
                <PencilSquareIcon className="text-white h-6 w-6 ml-2" />
              </div>
            </div>
            <div className="flex items-start justify-center md:justify-end w-full md:h-40 z-10">
              {!isLoading && mounted && <ConnectWalletButton />}
            </div>
            <div className="flex items-end justify-center md:justify-start w-full md:h-40">
              <Avatar />
            </div>
            <div className="flex items-end justify-center md:justify-end w-full md:h-40">
              <Balance />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
