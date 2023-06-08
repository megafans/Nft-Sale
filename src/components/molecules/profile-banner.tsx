import { memo } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useBalance, useNetwork } from 'wagmi'
import { Popover } from '@headlessui/react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { Avatar, Balance, ButtonLink } from '@/components'
import { useMounted, useUser } from '@/hooks'
import { blurDataUrl } from '@/helpers/constants'

type ProfileBannerProps = {
  isEditMode: boolean
  setEditMode: (value: boolean) => void
}

const ProfileBanner = ({ isEditMode, setEditMode }: ProfileBannerProps) => {
  const { user, isLoading } = useUser()
  const mounted = useMounted()
  const { chain } = useNetwork()
  const connected = mounted && !isLoading && chain
  const { data } = useBalance({
    address: '0xDE2F85d79825a5d0e823Ba0D733A37C3299Bc005',
  })

  return (
    <div className="relative">
      <div className="mx-auto max-w-auto">
        <div className="relative shadow-2xl shadow-purple/80 sm:overflow-hidden sm:rounded-2xl">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-5 md:p-10">
            <div className="flex items-start justify-center md:justify-start w-full md:h-40 col order-1 md:col-span-2">
              {connected && <ConnectButton showBalance={true} chainStatus="none" />}
              {connected && <span className="text-black">{data?.formatted}</span>}
            </div>
            <div className="flex items-start justify-center md:justify-end w-full md:h-40 z-10 order-2">
              {user ? (
                <div
                  className="inline-flex cursor-pointer py-2 px-4 bg-purple/80 rounded-lg"
                  onClick={() => setEditMode(!isEditMode)}
                >
                  <p className="text-base text-white font-medium">Edit profile:</p>
                  <PencilSquareIcon className="text-white h-6 w-6 ml-2" />
                </div>
              ) : (
                <Popover>
                  {({ open }) => (
                    <>
                      <Popover.Button>
                        <div className="inline-flex cursor-pointer py-2 px-4 bg-purple/80 rounded-lg">
                          <p className="text-base text-white font-medium">Edit profile:</p>
                          <PencilSquareIcon className="text-white h-6 w-6 ml-2" />
                        </div>
                      </Popover.Button>
                      {open && (
                        <div>
                          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl">
                            <div className="overflow-hidden rounded-lg shadow-lg bg-gray-50 flex flex-col items-center justify-center py-8">
                              <span className="font-bold text-lg mb-3">
                                To use all features please connect to megafans account:
                              </span>
                              <ButtonLink href="/sign-in" variant="primary" size="lg" ribbon>
                                <span>Connect to megafans account</span>
                                <ArrowLongRightIcon className="w-6 h-6 ml-10" />
                              </ButtonLink>
                            </div>
                          </Popover.Panel>
                        </div>
                      )}
                    </>
                  )}
                </Popover>
              )}
            </div>
            <div className="flex items-end justify-center md:justify-start w-full order-last md:order-3 md:col-span-2">
              {connected && <Avatar />}
              {!connected && <ConnectButton showBalance={true} chainStatus="none" />}
            </div>
            <div className="flex items-center md:mt-4 justify-center md:justify-end w-full md:h-40 order-4">
              {user && <Balance />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const MemoizedProfileBanner = memo(ProfileBanner)
