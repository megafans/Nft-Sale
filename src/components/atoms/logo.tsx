import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/">
      <Image className="h-10" src="/megafans.svg" alt="Company name" width={180} height={32} priority />
    </Link>
  )
}
