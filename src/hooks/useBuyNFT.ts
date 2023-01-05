import { useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { BigNumber as BN, ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import {
  useAccount,
  useContract,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
} from 'wagmi'

import { ensRegistryABI } from '@/utils/abi'

type recklesslySetUnpreparedProps = {
  recklesslySetUnpreparedOverrides?: {
    value: BigNumber | string
  }
}

export const useBuyNFT = () => {
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
  const { config } = usePrepareContractWrite({
    address: '0xa0f2056fd69a9be2c4671d5853545a16e030d68f',
    abi: ensRegistryABI,
    functionName: 'levelMint',
    args: ['0x1', '0x1'],
    //temporary: value based on getLevelPrice, gas limit based on estimatedgas
    overrides: {
      value: ethers.utils.parseEther('0.01'),
      gasPrice,
      gasLimit: BN.from(185264),
    },
  })
  const { write, isError } = useContractWrite(config)
  const { connector: activeConnector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const buyNFT = useCallback(() => {
    const recklesslySetUnprepared = {
      recklesslySetUnpreparedOverrides: {
        value: ethers.utils.parseEther('0.01'),
      },
    }

    isError
      ? addToast('Transaction failed beause of insufficient funds', {})
      : write?.(recklesslySetUnprepared as recklesslySetUnpreparedProps & undefined)
  }, [addToast, isError, write])

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

  const ethPrice = parseInt(data?.formatted.gasPrice!) / 100000000000000

  return {
    buyNFT,
    ethPrice,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
  }
}
