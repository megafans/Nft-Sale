import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { BigNumber as BN } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'

export const useBuyNFT = () => {
  const [nftListData, setNftListData] = useState([])
  const [nftListLoading, setNftListLoading] = useState(true)
  const { addToast } = useToasts()
  const { data } = useFeeData()
  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
  }
  const feeData = useFeeData()
  const { config } = usePrepareContractWrite({
    ...baseContract,
    functionName: 'mint',
    args: ['1'],
    //temporary: value based on getLevelPrice, gas limit based on estimated gas
    overrides: {
      value: 0.0007 * 10 ** 18,
      gasPrice: feeData?.data?.gasPrice || BN.from(0),
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
    contracts: nftIds
      ? (nftIds as string[]).map((nftId: string) => ({
          ...baseContract,
          functionName: 'tokenURI',
          args: [nftId],
        }))
      : [],
  })
  const { chain } = useNetwork()
  const buyNFT = useCallback(() => {
    isError ? addToast('Transaction failed beause of insufficient funds', {}) : write?.()
  }, [addToast, isError, write])

  const ethPrice = parseInt(data?.formatted.gasPrice!) / 100000000000000

  const fetchNFTListData = useCallback(async () => {
    const promises =
      nftList &&
      nftList.map(url =>
        axios
          .get(url as string)
          .then(response => response)
          .then(data => data)
      )
    const data = await Promise.all(promises ? promises : [])
    setNftListData(data as any)
    setNftListLoading(false)
  }, [nftList])

  useEffect(() => {
    fetchNFTListData()
  }, [fetchNFTListData])

  return {
    nftListLoading,
    buyNFT,
    ethPrice,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
    nftList: nftListData.map((nft: any) => nft.data),
    isNftListError,
  }
}
