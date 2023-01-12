import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { ToastProvider } from 'react-toast-notifications'

import { Container, CustomToast, Footer, Header } from '@/components'

type LayoutProps = { children: ReactNode }

export const Layout = ({ children }: LayoutProps) => {
  return (
    <RecoilRoot>
      <ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={3000}>
        <div className="min-h-screen bg-site bg-no-repeat bg-cover flex flex-col">
          <Header />
          <Container>{children}</Container>
          <Footer />
        </div>
      </ToastProvider>
    </RecoilRoot>
  )
}
