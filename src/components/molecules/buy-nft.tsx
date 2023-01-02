import { ArrowLongRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { useFeeData, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'

import { Button } from '@/components'
import { pricing } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'

type PricingData = {
  price?: string | null
  avaiable?: string | null
  wonRate?: string | null
}

export const BuyNFTModal = () => {
  const [pricingData, setPricingData] = useState<PricingData>({
    price: null,
    avaiable: null,
    wonRate: null,
  })

  const { data } = useFeeData()
  const contract = useContract({
    address: '0xa0f2056fd69a9be2c4671d5853545a16e030d68f',
    abi: ensRegistryABI,
  })

  const { config, error } = usePrepareContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: ensRegistryABI,
    functionName: 'mint',
  })

  const { data: contractData, write } = useContractWrite(config)

  console.log(data, contract)

  const getLevelPrice = async () => {
    const price = await contract.mintPricePerLevel(1)
    const levelLimit = await contract.mintLimitPerLevel(1)
    const levelMinted = await contract.mintedPerLevel(1)
    const totalValue = await contract.getTotalValueStaked()
    setPricingData({
      price: price,
      avaiable: (levelLimit - levelMinted)?.toString(),
      wonRate: ((1 / totalValue) * 100).toFixed(2),
    })
  }

  const buyNFT = async () => {
    contract
      ?.levelMint(1, parseInt(data?.formatted.gasPrice!))
      .then((gas: any) => {
        contract?.levelMint(1, parseInt(data?.formatted.gasPrice!)).send({
          from: '0x8a0e5c5e5f9f1b5b5b5b5b5b5b5b5b5b5b5b5b',
          value: 1,
          gas,
          gasPrice: data?.formatted.gasPrice,
        })
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getLevelPrice()
  }, [])

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
