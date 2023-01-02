import { ChangeEvent } from 'react'
import Image from 'next/image'

type InputFileProps = {
  name: string
  id: string
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export const InputFile = ({ name, id, label, value, onChange }: InputFileProps) => {
  return (
    <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-white px-6 pt-5 pb-6">
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-white"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex justify-center text-sm text-white pb-2">
          <label
            htmlFor={name}
            className="py-2 px-4 relative cursor-pointer rounded-md bg-white font-medium text-purple"
          >
            <span>{label}</span>
            <input id={id} name={name} type="file" className="sr-only" onChange={onChange} />
          </label>
        </div>
        <p className="text-xs text-gray-200">PNG, JPG, GIF up to 10MB</p>
        <Image
          src={value!}
          alt="avatar"
          width={100}
          height={100}
          className="inline-block h-32 w-32 rounded-full border border-white object-cover flex-shrink-0 mt-2"
        />
      </div>
    </div>
  )
}
