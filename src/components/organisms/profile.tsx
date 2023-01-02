import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { ButtonLink, ProfileBanner, ProfileEdit } from '@/components'
import { useMounted } from '@/hooks'

export const Profile = () => {
  const mounted = useMounted()
  const [isEditMode, setEditMode] = useState(false)

  const getProfileBannerView = () => {
    switch (isEditMode) {
      case true:
        return <ProfileEdit setEditMode={setEditMode} isEditMode={isEditMode} />
      default:
        return <ProfileBanner setEditMode={setEditMode} isEditMode={isEditMode} />
    }
  }

  return (
    <>
      {mounted ? getProfileBannerView() : null}
      <div className="flex justify-center mt-14">
        <ButtonLink size="lg" variant="primary" href="/profile">
          Buy NFT
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </ButtonLink>
      </div>
    </>
  )
}
