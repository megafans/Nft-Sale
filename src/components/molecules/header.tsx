import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { ButtonLink, Container, Logo, User, SocialButtons } from '@/components'
import { useUser } from '@/hooks'

export const Header = () => {
  const { user } = useUser()

  return (
    <div className="z-50 sticky top-0 bg-violet/70 backdrop-blur-md">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          <Logo />
          <div className="flex items-center flex-wrap flex-col-reverse md:flex-row mt-3 lg:mt-0">
            <SocialButtons />
            {user?.username ? (
              <User user={user} />
            ) : (
              <ButtonLink href="/sign-in" variant="primary" size="lg" ribbon>
                <span>Connect to megafans account</span>
                <ArrowLongRightIcon className="w-6 h-6 ml-10" />
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
