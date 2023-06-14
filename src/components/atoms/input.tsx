import { ChangeEvent } from 'react'
import clsx from 'clsx'

type InputProps = {
  placeholder?: string
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number'
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  error?: string
  touched?: boolean
  disabled?: boolean
  autoFocus?: boolean
}

export const Input = ({
  onChange,
  value,
  label,
  placeholder,
  name,
  id,
  type = 'text',
  error,
  touched,
  disabled,
  autoFocus = false,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={type} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        autoComplete="off"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          'w-full rounded-lg py-4 px-4 shadow-md text-md border border-white outline-none focus:ring-0 bg-white/40 placeholder-white text-white',
          error && 'border-red-400'
        )}
      />
      {error && touched && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}
