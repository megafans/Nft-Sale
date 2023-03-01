import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { ButtonLink, Container, Logo, User, SocialButtons } from '@/components'
import { useUser } from '@/hooks'

export const Header = () => {
  const { user } = useUser()

  return (
    <div className="z-50 sticky md:relative top-0 bg-violet/90 md:bg-transparent">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
          <Logo />
          <div className="flex items-center flex-wrap flex-col-reverse md:flex-row mt-3 md:mt-0">
            <SocialButtons />
            {user?.username ? (
              <User user={user} />
            ) : (
              <ButtonLink href="/sign-in" variant="primary" size="lg" ribbon>
                <span>Login</span>
                <ArrowLongRightIcon className="w-6 h-6 ml-10" />
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
