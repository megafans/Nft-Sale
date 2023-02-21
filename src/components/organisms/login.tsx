import Image from 'next/image'

import { FormTitle, LoginForm } from '@/components'
import { blurDataUrl, loginFormTitle } from '@/helpers/constants'

export const Login = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2 items-center">
        <Image
          src="/login-img.png"
          alt="Login"
          className="rounded-lg"
          width={560}
          height={560}
          blurDataURL={blurDataUrl}
          priority
        />
      </div>
      <div className="md:w-1/2 px-3">
        <FormTitle {...loginFormTitle} />
        <LoginForm />
      </div>
    </div>
  )
}
