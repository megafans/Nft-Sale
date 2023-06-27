import { useRecoilState } from 'recoil'
import { ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useToasts } from 'react-toast-notifications'

import { useUser, useMounted } from '@/hooks'
import { imageUpload } from '@/utils/repository'
import { avatarAtom } from '@/state/atoms'
import { capitalize } from '@/utils/helpers'

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
      switch (e.target.files[0]?.type) {
        case 'image/png':
          e.target.files[0].size > 5000000 ? addToast('Max file size is 5MB') : setFile(e.target.files[0])
          break
        case 'image/jpeg':
          e.target.files[0].size > 5000000 ? addToast('Max file size is 5MB') : setFile(e.target.files[0])
          break
        case 'image/jpg':
          e.target.files[0].size > 5000000 ? addToast('Max file size is 5MB') : setFile(e.target.files[0])
          break
        case 'image/gif':
          e.target.files[0].size > 5000000 ? addToast('Max file size is 5MB') : setFile(e.target.files[0])
          break
        default:
          addToast('Only jpg, gif and png files are allowed', {})
      }
    }
  }

  useEffect(() => {
    if (file) {
      file?.type.includes('image')
        ? imageUpload(file)
            .then(() => addToast('Image has been updated'))
            .catch(error => addToast(capitalize(error), {}))
        : addToast('Please upload an image', {})
    }
  }, [file, addToast])

  return (
    <div className="text-white z-10 relative bg-purple/80 p-3 rounded-lg">
      <div className="flex items-center">
        {user?.username && (
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
              <input
                id="change-avatar"
                type="file"
                onChange={handleFileChange}
                className="sr-only"
                accept="image/png, image/jpeg, image/jpg, image/gif"
              />
              <span className="bg-current rounded-full p-1 absolute top-3 left-28">
                <PlusIcon className="h-6 w-6" />
              </span>
            </label>
          </>
        )}
        <div className="ml-3 self-center w-full">
          {user?.username && (
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
