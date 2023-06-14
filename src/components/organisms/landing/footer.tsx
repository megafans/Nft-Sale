import clsx from 'clsx'

import { Container, Copyright, Logo, PaymentButtons } from '@/components'

export const LandingFooter = () => (
  <footer
    className="bg-no-repeat bg-cover mt-auto relative z-10"
    style={{
      background: 'linear-gradient(180deg, #242E56 0%, #2B3E6E 100%)',
    }}
    aria-labelledby="footer-heading"
  >
    <Container>
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <Logo />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-1 md:gap-4">
            <h3 className="text-3xl font-medium text-white leading-none inline-flex items-center">
              We accept following payment systems
            </h3>
            <PaymentButtons />
          </div>
        </div>
      </div>
      <Copyright
        text={
          <span>
            © 2023
            <a
              href="https://megafans.com/"
              target="_blank"
              rel="noreferrer"
              className={clsx(['relative ml-1', 'link'])}
            >
              Megafans
            </a>
            . All rights reserved.
          </span>
        }
      />
    </Container>
  </footer>
)
