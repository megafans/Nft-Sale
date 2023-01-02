import { ReactNode, MouseEvent } from 'react'
import Ink from 'react-ink'
import cslx from 'clsx'

type ButtonProps = {
  disabled?: boolean
  onClick?: (e: MouseEvent) => void
  children: ReactNode
  type: 'button' | 'submit'
  variant: 'primary' | 'secondary' | 'clean'
  size: 'sm' | 'md' | 'lg'
}

export const Button = ({
  disabled = false,
  onClick,
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cslx(
        'relative inline-flex items-center rounded-full text-md font-medium shadow-sm focus:outline-none border',
        variant === 'primary' && 'bg-current border-current text-white',
        variant === 'secondary' && 'bg-purple text-gray-200 border-white/70 hover:bg-purple/90 transform',
        variant === 'clean' && 'bg-transparent text-gray-800',
        size === 'sm' && 'px-3 py-1 text-sm',
        size === 'lg' && 'px-6 py-4',
        size === 'md' && 'px-4 py-2'
      )}
    >
      <Ink />
      {children}
    </button>
  )
}
