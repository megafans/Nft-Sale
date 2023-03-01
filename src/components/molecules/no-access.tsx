import { ArrowRightOnRectangleIcon, PlusIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { ButtonLink } from '@/components'

const links = [
  { title: 'Login', description: 'Login to our app', icon: ArrowRightOnRectangleIcon, href: '/sign-in', id: 1 },
  { title: 'Register', description: 'Create account', icon: PlusIcon, href: '/sign-up', id: 2 },
]

export const NoAccess = () => {
  return (
    <div className="mx-auto items-center max-w-xl py-16 sm:py-24 px-2">
      <div className="text-center">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl uppercase">
          It seems you don&apos;t have access to this page.
        </h1>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white text-center">Meantime check our most popular pages</h2>
        <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {links?.map(link => (
            <li key={link.id} className="relative flex items-start space-x-4 py-6">
              <div className="flex-shrink-0">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/80">
                  <link.icon className="h-6 w-6 text-purple" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-200 hover:text-purple uppercase">
                  <span className="rounded-sm outline-none">
                    <Link href={link.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {link.title}
                    </Link>
                  </span>
                </h3>
                <p className="text-base text-gray-200">{link.description}</p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ArrowLongRightIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <ButtonLink href="/" variant="transparent" size="lg" ribbon>
            <span className="font-bold">Go back home</span>
            <ArrowLongRightIcon className="w-6 h-6 ml-10" />
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
