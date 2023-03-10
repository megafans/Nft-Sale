import { RadioGroup } from '@headlessui/react'
import cslx from 'clsx'

type NFTQuantityProps = {
  nftQuantity: string
  setNftQuantity: (value: string) => void
}

const radioOptions = ['1', '2', '3', '4', '5', '6', '7']

export const NFTQuantity = ({ nftQuantity, setNftQuantity }: NFTQuantityProps) => {
  return (
    <div className="flex">
      <RadioGroup value={nftQuantity} onChange={setNftQuantity} className="flex flex-col mt-4 w-full justify-between">
        <RadioGroup.Label className="text-white">Check how many nfts you want to buy:</RadioGroup.Label>
        <div className="flex">
          {radioOptions.map(option => (
            <RadioGroup.Option value={option} key={option}>
              {({ checked }) => (
                <span
                  className={cslx(
                    'text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer',
                    checked && 'border border-white text-current'
                  )}
                >
                  {option}
                </span>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
