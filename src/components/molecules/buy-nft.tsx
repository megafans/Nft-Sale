import { ArrowLongRightIcon, CheckIcon } from '@heroicons/react/24/solid'
import { BigNumber } from '@ethersproject/bignumber'
import { useFeeData, useContract, useProvider, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import { BigNumber as BN } from 'ethers'

import { Button } from '@/components'
import { pricing } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'

type PricingData = {
  price: string | null
  avaiable: string | null
  wonRate: string | null
}

export const BuyNFTModal = () => {
  const [pricingData, setPricingData] = useState<PricingData>({
    price: null,
    avaiable: null,
    wonRate: null,
  })

  const [gas, setGas] = useState<BigNumber | undefined>(() => BN.from(1))

  const { data } = useFeeData()
  const gasPrice: BigNumber = data?.gasPrice as BigNumber
  const provider = useProvider()
  const contract = useContract({
    address: '0xa0f2056fd69a9be2c4671d5853545a16e030d68f',
    abi: ensRegistryABI,
    signerOrProvider: provider,
  })

  useEffect(() => {
    async function estimateGasAmount() {
      const amount = await contract?.estimateGas.levelMint(1, 1, {
        gasLimit: BN.from(185264),
      })
      setGas(amount)
    }

    if (contract) {
      estimateGasAmount()
    }
  }, [contract])

  const { config, error } = usePrepareContractWrite({
    address: '0xa0f2056fd69a9be2c4671d5853545a16e030d68f',
    abi: ensRegistryABI,
    functionName: 'levelMint',
    args: ['0x1', '0x1'],
    //temporary: value based on getLevelPrice, gas limit based on estimatedgas
    overrides: {
      value: 100000000000000,
      gasPrice,
      gasLimit: BN.from(185264),
    },
  })
  const { write } = useContractWrite(config)

  const getLevelPrice = async () => {
    //TODO: add interaction with contract to calculate price based on selected level
    // const price = await contract?.mintPricePerLevel(0x1)
    // const levelLimit = await contract?.mintLimitPerLevel(0x1)
    // const levelMinted = await contract?.mintedPerLevel(1)
    // const totalValue = await contract?.getTotalValueStaked()
    // setPricingData({
    //   price: price,
    //   avaiable: (levelLimit - levelMinted)?.toString(),
    //   wonRate: ((1 / totalValue) * 100).toFixed(2),
    // })
  }

  const buyNFT = async () => {
    write?.({
      recklesslySetUnpreparedOverrides: {
        value: 100000000000000,
      },
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
            <h3 className="text-3xl font-semibold text-indigo-800">{tier.title}</h3>
            {tier.mostPopular ? (
              <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-indigo-400 py-1.5 px-4 text-sm font-semibold text-white">
                Most popular
              </p>
            ) : null}
            <p className="mt-4 flex justify-center items-baseline text-gray-900">
              <span className="mr-1 text-xl font-semibold uppercase">avalible:</span>
              <span className="text-4xl font-bold tracking-tight">{tier.avalible}</span>
            </p>

            <ul role="list" className="mt-6 space-y-6">
              {tier.features.map(feature => (
                <li key={feature} className="flex">
                  <CheckIcon className="h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                  <span className="ml-3 text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button type="button" size="lg" variant="primary" onClick={() => buyNFT()}>
            {tier.cta}
            <ArrowLongRightIcon className="w-6 h-6 ml-10" />
          </Button>
        </div>
      ))}
    </div>
  )
}
