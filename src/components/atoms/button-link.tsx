import { ReactNode } from 'react'
import Ink from 'react-ink'
import cslx from 'clsx'
import Link from 'next/link'

import { useMounted } from '@/hooks'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant: 'primary' | 'transparent'
  size: 'sm' | 'md' | 'lg'
  ribbon: boolean
  external?: boolean
}

export const ButtonLink = ({
  href = '/',
  children,
  variant = 'primary',
  size = 'md',
  ribbon = true,
  external = false,
}: ButtonLinkProps) => {
  const mounted = useMounted()
  return (
    <>
      {mounted && (
        <Link
          rel={external ? 'noopener noreferrer' : ''}
          target={external ? '_blank' : '_self'}
          href={href}
          className={cslx(
            'relative inline-flex items-center rounded-full text-md font-medium focus:outline-none ',
            variant === 'primary' && 'bg-current text-white border border-current shadow-md',
            variant === 'transparent' && 'bg-transparent text-white shadow-none',
            size === 'sm' && 'px-3 py-1 text-sm',
            size === 'md' && 'px-4 py-2',
            size === 'lg' && 'px-6 py-4'
          )}
        >
          {ribbon && <Ink />}
          {children}
        </Link>
      )}
    </>
  )
}
