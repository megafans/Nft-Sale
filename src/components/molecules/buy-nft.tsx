import { ArrowLongRightIcon, StarIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components'
import { pricing } from '@/helpers/constants'
import { useBuyNFT } from '@/hooks'

export const BuyNFTModal = () => {
  const { buyNFT, ethPrice } = useBuyNFT()

  return (
    <div className="mt-24 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
      {pricing.tiers.map(tier => (
        <div
          key={tier.title}
          className="relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="flex-1 mb-4">
            <h3 className="text-3xl font-bold uppercase text-indigo-500">{tier.title}</h3>
            {tier.mostPopular ? (
              <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-400 py-1.5 px-4 text-sm font-semibold text-white">
                Most popular
              </p>
            ) : null}
            <span className="inline-flex mt-2">
              <svg
                className="w-3 fill-indigo-500 mr-2 font-bold"
                viewBox="0 0 12 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 10L6 0L12 10L6 14L0 10Z" />
                <path d="M0 11.5L6 15.5L12 11.5L6 20L0 11.5Z" />
              </svg>
              {ethPrice}
            </span>
            <p className="mt-4 flex justify-center items-baseline text-gray-600">
              <span className="mr-1 text-xl font-semibold uppercase">avalible:</span>
              <span className="text-4xl font-bold tracking-tight">{tier.avalible}</span>
            </p>

            <ul role="list" className="mt-6 space-y-6">
              {tier.features.map(feature => (
                <li key={feature} className="flex">
                  <StarIcon className="h-6 w-6 flex-shrink-0 text-indigo-400" aria-hidden="true" />
                  <span className="ml-3 text-gray-600">{feature}</span>
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
