import { ReactNode, MouseEvent } from 'react'
import Ink from 'react-ink'
import cslx from 'clsx'

type ButtonProps = {
  disabled?: boolean
  onClick?: (e: MouseEvent) => void
  children: ReactNode
  type: 'button' | 'submit'
  variant: 'primary' | 'secondary'
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
        'relative inline-flex items-center rounded-full text-md font-medium shadow-sm focus:outline-none border border-current',
        variant === 'primary' && 'bg-current text-white',
        variant === 'secondary' && 'bg-white text-gray-800 border-white/70 hover:bg-gray-50',
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
