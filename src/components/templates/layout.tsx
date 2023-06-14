import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { ToastProvider } from 'react-toast-notifications'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { Container, CustomToast, Footer, Header } from '@/components'
import { animationVariants } from '@/helpers/constants'

type LayoutProps = { children: ReactNode }

export const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter()

  return (
    <motion.div
      key={asPath}
      variants={animationVariants}
      animate="in"
      initial="out"
      exit="out"
      transition={{
        type: 'spring',
        stiffness: 30,
      }}
    >
      <RecoilRoot>
        <ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={3000}>
          <div className="min-h-screen bg-site bg-no-repeat bg-cover flex flex-col">
            <Header />
            <Container>{children}</Container>
            <Footer />
          </div>
        </ToastProvider>
      </RecoilRoot>
    </motion.div>
  )
}
