import Image from 'next/image'

import { useUser, useMounted } from '@/hooks'

export const Avatar = () => {
  const mounted = useMounted()
  const { user, address } = useUser()
  const avatar = user?.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

  return (
    <div className="text-white z-10">
      <div className="flex items-center">
        <Image
          className="inline-block h-32 w-32 rounded-full border border-purple object-cover flex-shrink-0"
          src={avatar}
          alt="User avatar"
          height={60}
          width={60}
          blurDataURL={avatar}
        />
        <div className="ml-3">
          <p className="uppercase font-bold text-3xl text-white">{user?.username}</p>
          <p className="text-xl font-medium text-white">{user?.email}</p>
          {mounted ? address && <p className="text-sm font-medium text-white">{address}</p> : null}
        </div>
      </div>
    </div>
  )
}
