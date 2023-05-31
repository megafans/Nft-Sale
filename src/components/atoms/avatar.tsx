import { useRecoilState } from 'recoil'
import { ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLongRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useToasts } from 'react-toast-notifications'

import { useUser, useMounted } from '@/hooks'
import { imageUpload } from '@/utils/repository'
import { avatarAtom } from '@/state/atoms'
import { ButtonLink } from '@/components'

export const Avatar = () => {
  const mounted = useMounted()
  const [file, setFile] = useRecoilState(avatarAtom)
  const { user, address } = useUser()
  const { addToast } = useToasts()

  const avatar =
    (file && file?.type.includes('image') ? URL.createObjectURL(file) : user?.image) ||
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (file) {
      file?.type.includes('image') ? imageUpload(file) : addToast('Please upload an image', {})
    }
  }, [file, addToast])

  return (
    <div className="text-white z-10 relative bg-purple/80 p-3 rounded-lg">
      <div className="flex items-center">
        {user && (
          <>
            <Image
              className="inline-block h-32 w-32 rounded-full border-transparent object-cover flex-shrink-0 shadow-2xl"
              src={avatar}
              alt="User avatar"
              height={80}
              width={80}
              blurDataURL={avatar}
            />
            <label htmlFor="change-avatar" className="cursor-pointer ml-3">
              <input id="change-avatar" type="file" onChange={handleFileChange} className="sr-only" />
              <span className="bg-current rounded-full p-1 absolute top-3 left-28">
                <PlusIcon className="h-6 w-6" />
              </span>
            </label>
          </>
        )}
        <div className="ml-3 self-center w-full">
          {user && (
            <>
              <p className="uppercase font-bold text-3xl text-white hyphens-manual break-all">{user?.username}</p>
              <p className="text-xl font-medium text-white hyphens-manual break-all">{user?.email}</p>
            </>
          )}
          {mounted
            ? address && (
                <p className="text-sm font-medium text-white text-ellipsis hyphens-manual break-all">{address}</p>
              )
            : null}
        </div>
      </div>
    </div>
  )
}
