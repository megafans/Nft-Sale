import Image from 'next/image'

import { FormTitle, RegisterForm } from '@/components'
import { blurDataUrl, registerFormTitle } from '@/helpers/constants'

export const Register = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2 items-center">
        <Image
          src="/register-img.png"
          alt="Login"
          className="rounded-lg"
          width={560}
          height={480}
          blurDataURL={blurDataUrl}
          priority
        />
      </div>
      <div className="md:w-1/2 px-3">
        <FormTitle {...registerFormTitle} />
        <RegisterForm />
      </div>
    </div>
  )
}
