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
            <Dialog.Panel className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-800 p-10 rounded-xl shadow-xl w-full max-w-6xl">
              <Dialog.Title ref={completeButtonRef} className="text-white uppercase font-bold text-3xl">
                {title}
              </Dialog.Title>
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
