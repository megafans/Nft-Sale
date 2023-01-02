import { ReactNode, useRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type ModalProps = {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ title, open, onClose, children }: ModalProps) => {
  const completeButtonRef = useRef(null)

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose} initialFocus={completeButtonRef}>
        <div className="fixed inset-0 overflow-y-auto bg-black/60">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Dialog.Panel className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-800 p-10 rounded-xl shadow-xl w-full max-w-6xl">
                <Dialog.Title ref={completeButtonRef} className="text-white uppercase font-bold text-3xl">
                  {title}
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
