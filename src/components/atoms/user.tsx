import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid'

import { User as UserType } from '@/types/user'
import { useAuth } from '@/hooks'

export const User = ({ user }: UserType) => {
  const { logout } = useAuth()
  const avatar = user?.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="flex items-center bg-white/10 py-3 px-5 rounded-lg outline-none focus:ring-0">
            <Image
              className="inline-block h-10 w-10 rounded-full object-cover"
              src={avatar}
              alt=""
              width={25}
              height={25}
            />
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-200">{user?.username}</p>
              <p className="text-xs font-medium text-gray-200">{user?.email}</p>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-16 right-1/2 md:right-0 translate-x-1/2 md:translate-x-0 z-20 mt-3 w-screen md:w-64 max-w-md px-2 sm:px-0">
              <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-4 sm:p-4" onClick={() => close()}>
                  <Link href="/profile">
                    <div className="cursor-pointer -m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out">
                      <UserIcon className="h-6 w-6 flex-shrink-0 text-purple" aria-hidden="true" />
                      <div className="ml-4">
                        <p className="text-base font-bold text-gray-800">Profile</p>
                      </div>
                    </div>
                  </Link>
                  <hr />
                  <div
                    onClick={logout}
                    className="cursor-pointer -m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out"
                  >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 flex-shrink-0 text-purple" aria-hidden="true" />
                    <div className="ml-4">
                      <p className="text-base font-bold text-gray-800">Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
