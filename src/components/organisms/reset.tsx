import Image from 'next/image'

import { FormTitle, ResetForm } from '@/components'
import { blurDataUrl, resetFormTitle } from '@/helpers/constants'

export const Reset = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2">
        <Image src="/register-img.svg" alt="Login" width={560} height={560} blurDataURL={blurDataUrl} priority />
      </div>
      <div className="md:w-1/2 px-3">
        <FormTitle {...resetFormTitle} />
        <ResetForm />
      </div>
    </div>
  )
}
