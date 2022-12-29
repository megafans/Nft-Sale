import Image from 'next/image'
import Link from 'next/link'

import { blurDataUrl } from '@/helpers/constants'

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="h-10 w-auto"
        src="/megafans.svg"
        alt="Company name"
        width={180}
        height={32}
        blurDataURL={blurDataUrl}
        priority
      />
    </Link>
  )
}
