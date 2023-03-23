import { Switch } from '@headlessui/react'

type NftListHeaderProps = {
  compact?: boolean
  setCompact?: (value: boolean) => void
  listLenght?: number
}

export const NftListHeader = ({ compact, setCompact, listLenght }: NftListHeaderProps) => {
  return (
    <div className="flex items-center min-w-full justify-between mt-20">
      <h1 className="text-3xl font-black text-white underline decoration-current underline-offset-8 inline-flex">
        You own {listLenght} NFTs
      </h1>
      <div className="flex items-center space-x-3">
        <p className="text-white">Compact view</p>
        <Switch
          checked={compact}
          onChange={setCompact}
          className={`${
            compact ? 'bg-purple/80' : 'bg-white/40'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              compact ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-violet transition`}
          />
        </Switch>
      </div>
    </div>
  )
}
