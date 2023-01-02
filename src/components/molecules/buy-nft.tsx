import { ArrowLongRightIcon, StarIcon } from '@heroicons/react/24/solid'

import { Button, EthIcon } from '@/components'
import { pricing } from '@/helpers/constants'
import { useBuyNFT } from '@/hooks'

export const BuyNFTModal = () => {
  const { buyNFT, ethPrice } = useBuyNFT()

  return (
    <div className="mt-24 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
      {pricing.tiers.map(tier => (
        <div
          key={tier.title}
          className="relative flex flex-col items-center rounded-2xl border border-red-400 bg-gradient-to-b from-indigo-700 via-purple-500 to-violet p-8 shadow-sm"
        >
          <div className="flex-1 mb-4">
            <h3 className="text-3xl font-bold uppercase text-gray-200 bg-violet rounded-lg py-2 border border-indigo-400">
              {tier.title}
            </h3>
            {tier.mostPopular ? (
              <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-400 py-1.5 px-4 text-sm font-semibold text-gray-200">
                Most popular
              </p>
            ) : null}
            <span className="inline-flex mt-3 text-gray-200">
              <EthIcon colorClass="fill-indigo-400" />
              {ethPrice}
            </span>
            <p className="mt-4 flex justify-center items-baseline text-gray-200">
              <span className="mr-1 text-xl font-semibold uppercase">avalible:</span>
              <span className="text-4xl font-bold tracking-tight">{tier.avalible}</span>
            </p>

            <ul role="list" className="mt-6 space-y-6">
              {tier.features.map(feature => (
                <li key={feature} className="flex">
                  <StarIcon className="h-6 w-6 flex-shrink-0 text-indigo-400" aria-hidden="true" />
                  <span className="ml-3 text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button type="button" size="lg" variant="secondary" onClick={() => buyNFT()}>
            {tier.cta}
            <ArrowLongRightIcon className="w-6 h-6 ml-10" />
          </Button>
        </div>
      ))}
    </div>
  )
}
