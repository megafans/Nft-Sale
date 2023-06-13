import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { ReactNode } from 'react'
import { ToastProvider } from 'react-toast-notifications'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { ButtonLink, Container, CustomToast, Footer, Logo } from '@/components'
import { animationVariants } from '@/helpers/constants'

type LayoutProps = { children: ReactNode }

export const AuthLayout = ({ children }: LayoutProps) => {
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
      <ToastProvider components={{ Toast: CustomToast }} autoDismiss={true} autoDismissTimeout={3000}>
        <div className="min-h-screen bg-site bg-no-repeat bg-cover flex flex-col">
          <Container>
            <div className="flex justify-end md:justify-center relative">
              <div className="absolute -top-1 left-0">
                <ButtonLink href="/" variant="transparent" size="lg" ribbon>
                  <ArrowLongLeftIcon className="w-6 h-6 mr-2" />
                  <span className="font-bold">Back to home</span>
                </ButtonLink>
              </div>
              <Logo />
            </div>
          </Container>
          <Container>{children}</Container>
          <Footer />
        </div>
      </ToastProvider>
    </motion.div>
  )
}
