import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { useAccount, useContractRead, useContractReads, useContractWrite, useNetwork } from 'wagmi'
import { useRouter } from 'next/router'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'

export const useBuyNFT = () => {
  const router = useRouter()
  const [nftListData, setNftListData] = useState([])
  const [nftListLoading, setNftListLoading] = useState(true)
  const [mintedTokenId, setMintedTokenId] = useState<string>()
  const [mintLoading, setMintLoading] = useState(false)
  const { addToast } = useToasts()
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
          args: [nftId.toString()],
        }))
      : [],
    suspense: true,
  })
  const { chain } = useNetwork()

  const buyNFT = async () => {
    try {
      if (mint) {
        setMintLoading(true)
        const tx = await mint({})
        const receipt = await tx.wait()
        const mintedTokenIdHex: string = receipt?.logs[0].topics[3]
        const mintedTokenId = parseInt(mintedTokenIdHex)
        setMintedTokenId(mintedTokenIdHex)
        mintedTokenId && router.push('/nft/confirmation')
      }
    } catch (error) {
      error && mintError?.message.includes('insufficient funds')
        ? addToast('Transaction failed beause of insufficient funds', {})
        : addToast('Transaction failed', {})
    } finally {
      setMintLoading(false)
    }
  }

  const fetchNFTListData = useCallback(async () => {
    const promises =
      nftList &&
      nftList[0] !== null &&
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
    mintLoading,
    buyNFT,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
    nftList: nftListData.map((nft: any) => nft.data),
    isNftListError,
  }
}
