import { RadioGroup } from '@headlessui/react'
import cslx from 'clsx'

type NFTQuantityProps = {
  nftQuantity: string
  setNftQuantity: (value: string) => void
}

export const NFTQuantity = ({ nftQuantity, setNftQuantity }: NFTQuantityProps) => {
  return (
    <div className="flex">
      <RadioGroup value={nftQuantity} onChange={setNftQuantity} className="flex flex-col mt-4 w-full justify-between">
        <RadioGroup.Label className="text-white">Check how many nfts you want to buy:</RadioGroup.Label>
        <div className="flex">
          <RadioGroup.Option value="1">
            {({ checked }) => (
              <span
                className={cslx(
                  'text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer',
                  checked && 'border border-white'
                )}
              >
                1
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="2">
            {({ checked }) => (
              <span
                className={cslx(
                  'text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer',
                  checked && 'border border-white'
                )}
              >
                2
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="3">
            {({ checked }) => (
              <span
                className={cslx(
                  'text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer',
                  checked && 'border border-white'
                )}
              >
                3
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="4">
            {({ checked }) => (
              <span
                className={cslx(
                  'text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer',
                  checked && 'border border-white'
                )}
              >
                4
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="5">
            {({ checked }) => (
              <span
                className={cslx(
                  'text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold cursor-pointer',
                  checked && 'border border-white'
                )}
              >
                5
              </span>
            )}
          </RadioGroup.Option>
        </div>
      </RadioGroup>
    </div>
  )
}
