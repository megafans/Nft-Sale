import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

import { ButtonLink, ProfileBanner } from '@/components'
import { useUser } from '@/hooks'

export const Profile = () => {
  const { user } = useUser()

  return (
    <>
      <ProfileBanner />
      <div className="flex justify-center mt-14">
        <ButtonLink size="lg" variant="primary" href={user?.username ? '/profil' : '/sign-in'}>
          Buy NFT
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </ButtonLink>
      </div>
    </>
  )
}
