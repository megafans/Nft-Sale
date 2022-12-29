import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'
import { ToastProvider } from 'react-toast-notifications'

import { ButtonLink, Container, CustomToast, Footer, Logo } from '@/components'

type LayoutProps = { children: ReactNode }

export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={3000}>
      <div className="min-h-screen bg-site bg-no-repeat bg-cover flex flex-col">
        <Container>
          <div className="flex justify-end md:justify-center relative">
            <div className="absolute -top-1 left-0">
              <ButtonLink href="/" variant="transparent" size="lg">
                <ArrowLongLeftIcon className="w-6 h-6 mr-2" />
                <span className="font-bold">Back to began</span>
              </ButtonLink>
            </div>
            <Logo />
          </div>
        </Container>
        <Container>{children}</Container>
        <Footer />
      </div>
    </ToastProvider>
  )
}
