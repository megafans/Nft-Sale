import Image from 'next/image'
import Ink from 'react-ink'

import { blurDataUrl, paymentButtons } from '@/helpers/constants'

export const PaymentButtons = () => {
  return (
    <div className="flex mr-2 mt-4 md:mr-8 md:mt-0">
      {paymentButtons.map(({ id, src, alt }) => (
        <div className="flex items-center relative cursor-pointer mr-6 bg-white/10 rounded-md px-6" key={id}>
          <Ink radius={50} opacity={0.5} />
          <Image
            className="h-auto w-10 "
            src={src}
            alt={alt}
            width={48}
            height={48}
            blurDataURL={blurDataUrl}
            priority
          />
        </div>
      ))}
    </div>
  )
}
