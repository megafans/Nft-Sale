import { MegaphoneIcon, XMarkIcon, ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'
import { useToasts } from 'react-toast-notifications'

import { ButtonLink } from '@/components'

type CustomToastProps = {
  children: ReactNode
}

export const CustomToast = ({ children }: CustomToastProps) => {
  const { removeToast, toastStack } = useToasts()

  return (
    <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
      <div className="mx-auto max-w-3xl px-2 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-purple p-2 shadow-lg sm:p-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-white/40 p-2">
                <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span>{children}</span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <div className="flex">
                <ButtonLink href="/" variant="transparent" size="sm" ribbon>
                  <ArrowLongLeftIcon className="w-6 h-6" />
                </ButtonLink>
                <button
                  type="button"
                  className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => removeToast(toastStack[0].id)}
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
