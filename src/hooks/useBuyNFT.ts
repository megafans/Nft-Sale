import { useCallback } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { BigNumber as BN } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import {
  useAccount,
  useContract,
  useContractRead,
  useContractReads,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
} from 'wagmi'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'

export const useBuyNFT = () => {
  const { addToast } = useToasts()
  const { data } = useFeeData()
  const gasPrice: BigNumber = data?.gasPrice as BigNumber
  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
  }
  const { config } = usePrepareContractWrite({
    ...baseContract,
    functionName: 'mint',
    args: ['1'],
    //temporary: value based on getLevelPrice, gas limit based on estimated gas
    overrides: {
      value: 0.00005 * 10 ** 18,
      maxFeePerGas: BN.from(167944641594),
    },
  })
  const { address, connector: activeConnector, isConnected } = useAccount()
  const { write, isError } = useContractWrite(config as any)
  const { data: nftIds, isError: isNftListError } = useContractRead({
    ...baseContract,
    functionName: 'listMyNFTs',
    args: [address],
  })
  const { data: nftList } = useContractReads({
    contracts: (nftIds as string[]).map((nftId: string) => ({
      ...baseContract,
      functionName: 'tokenURI',
      args: [nftId],
    })),
  })
  const { chain } = useNetwork()
  const buyNFT = useCallback(() => {
    isError ? addToast('Transaction failed beause of insufficient funds', {}) : write?.()
  }, [addToast, isError, write])

  const ethPrice = parseInt(data?.formatted.gasPrice!) / 100000000000000

  return {
    buyNFT,
    ethPrice,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
    nftList,
    isNftListError,
  }
}
