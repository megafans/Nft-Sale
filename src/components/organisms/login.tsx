import Image from 'next/image'

import { FormTitle, LoginForm } from '@/components'
import { loginFormTitle } from '@/helpers/constants'

export const Login = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2">
        <Image src="/login-img.svg" alt="Login" width={560} height={560} priority />
      </div>
      <div className="md:w-1/2 px-3">
        <FormTitle {...loginFormTitle} />
        <LoginForm />
      </div>
    </div>
  )
}
