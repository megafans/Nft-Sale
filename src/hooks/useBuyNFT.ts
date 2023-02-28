import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi'
import { useRouter } from 'next/router'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'

export const useBuyNFT = () => {
  const router = useRouter()
  const [mintedTokenId, setMintedTokenId] = useState<string>()
  const [mintLoading, setMintLoading] = useState(false)
  const { addToast } = useToasts()

  const { chain } = useNetwork()
  const { address, connector: activeConnector, isConnected } = useAccount()

  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
    chainId: 5,
  }

  const { writeAsync: mint, error: mintError } = useContractWrite({
    ...baseContract,
    functionName: 'mint',
    args: ['1'],
    overrides: { value: ethers.utils.parseEther('0.005') },
  })

  const {
    data: nftIds,
    isError: isNftListError,
    isLoading,
  } = useContractRead<any, any, BigNumber[]>({
    ...baseContract,
    enabled: address && address !== '0x',
    functionName: 'listMyNFTs',
    args: [address],
  })

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
        ? addToast('Transaction failed because of insufficient funds', {})
        : addToast('Transaction failed', {})
    } finally {
      setMintLoading(false)
    }
  }

  return {
    mintLoading,
    buyNFT,
    nftIds,
    isLoading,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
    isNftListError,
  }
}
