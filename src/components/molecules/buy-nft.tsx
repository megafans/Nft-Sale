import { ArrowLongRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { BigNumber as BN } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { useContract, useContractWrite, useFeeData, usePrepareContractWrite, useProvider } from 'wagmi'

import { Button } from '@/components'
import { pricing } from '@/helpers/constants'
import { ensRegistryABI } from '@/utils/abi'

export const BuyNFTModal = () => {
  const { addToast } = useToasts()
  const [, setGas] = useState<BigNumber | undefined>(() => BN.from(1))

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

  const { config } = usePrepareContractWrite({
    address: '0xa0f2056fd69a9be2c4671d5853545a16e030d68f',
    abi: ensRegistryABI,
    functionName: 'levelMint',
    args: ['0x1', '0x1'],
    //temporary: value based on getLevelPrice, gas limit based on estimatedgas
    overrides: {
      value: 10,
      gasPrice,
      gasLimit: BN.from(185264),
    },
  })
  const { write, isError } = useContractWrite(config)

  const buyNFT = async () => {
    if (isError) {
      addToast('Transaction failed beause of insufficient funds', {})
    }

    write?.({
      recklesslySetUnpreparedOverrides: {
        value: 10,
      },
    })
  }

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
              {parseInt(data?.formatted.gasPrice!) / 100000000000000}
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
