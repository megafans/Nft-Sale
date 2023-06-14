import { ChangeEvent } from 'react'

type ItemProps = { id: number; name: number | string }

type SelectProps = {
  id: string
  name: string
  label: string
  labelName?: string
  value: string
  items: ItemProps[]
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ label, items, id, name, value, placeholder, onChange }: SelectProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <select
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        className="mt-2 flex w-full rounded-md border border-white py-4 px-4 pr-10 text-base outline-none bg-white/50 placeholder:text-white text-white"
      >
        {items?.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}
