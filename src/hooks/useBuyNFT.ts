import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { BigNumber as BN, ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { useAccount, useContractRead, useContractReads, useContractWrite, useFeeData, useNetwork } from 'wagmi'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'

export const useBuyNFT = () => {
  const [nftListData, setNftListData] = useState([])
  const [nftListLoading, setNftListLoading] = useState(true)
  const [mintedTokenId, setMintedTokenId] = useState<string>()
  const [mintLoading, setMintLoading] = useState(false)
  const { addToast } = useToasts()
  const { data } = useFeeData()
  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
  }
  const { writeAsync: mint, error: mintError } = useContractWrite({
    ...baseContract,
    functionName: 'mint',
    args: ['1'],
    overrides: { value: ethers.utils.parseEther('0.005') },
  })
  const { address, connector: activeConnector, isConnected } = useAccount()
  const { data: nftIds, isError: isNftListError } = useContractRead({
    ...baseContract,
    functionName: 'listMyNFTs',
    args: [address],
  })
  const { data: mintedNftDetails, isError: mintedNftDetailsError } = useContractRead({
    ...baseContract,
    functionName: 'tokenURI',
    args: [mintedTokenId],
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

  const buyNFT = async () => {
    try {
      if (mint) {
        setMintLoading(true)
        const tx = await mint({})
        const receipt = await tx.wait()
        const mintedTokenIdHex: string = await receipt?.logs[0].topics[3]
        const mintedTokenId = parseInt(mintedTokenIdHex)
        setMintedTokenId(mintedTokenIdHex)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setMintLoading(false)
    }
  }

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
