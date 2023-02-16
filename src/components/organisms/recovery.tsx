import Image from 'next/image'

import { FormTitle, RecoveryForm } from '@/components'
import { blurDataUrl, recoveryFormTitle, recoveryFormTitleSuccess } from '@/helpers/constants'

type RecoveryProps = {
  success?: boolean
}

export const Recovery = ({ success = false }: RecoveryProps) => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2 items-center">
        <Image
          src="/forgot-img.png"
          alt="Login"
          className="rounded-lg"
          width={560}
          height={560}
          blurDataURL={blurDataUrl}
          priority
        />
      </div>
      <div className="md:w-1/2 px-3">
        {success ? (
          <FormTitle {...recoveryFormTitleSuccess} />
        ) : (
          <>
            <FormTitle {...recoveryFormTitle} />
            <RecoveryForm />
          </>
        )}
      </div>
    </div>
  )
}
