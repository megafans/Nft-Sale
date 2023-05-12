import { useState, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useToasts } from 'react-toast-notifications'

import { useUser, useMounted } from '@/hooks'
import { imageUpload } from '@/utils/repository'

export const Avatar = () => {
  const mounted = useMounted()
  const [file, setFile] = useState<File | null>(null)
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
    <div className="text-white z-10 relative">
      <div className="flex items-center">
        <Image
          className="inline-block h-32 w-32 rounded-full border border-purple object-cover flex-shrink-0"
          src={avatar}
          alt="User avatar"
          height={80}
          width={80}
          blurDataURL={avatar}
        />
        <label htmlFor="change-avatar" className="cursor-pointer ml-5">
          <input id="change-avatar" type="file" onChange={handleFileChange} className="sr-only" />
          <span className="bg-purple rounded-full p-1 absolute top-0 left-24">
            <PlusIcon className="h-6 w-6" />
          </span>
        </label>
        <div className="ml-3 bg-purple/60 p-3 rounded-lg">
          <p className="uppercase font-bold text-3xl text-white">{user?.username}</p>
          <p className="text-xl font-medium text-white">{user?.email}</p>
          {mounted ? address && <p className="text-sm font-medium text-white">{address}</p> : null}
        </div>
      </div>
    </div>
  )
}
