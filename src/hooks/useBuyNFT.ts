import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'
import { nftPaymentAtom, nftPaymentETHAtom } from '@/state/atoms'
import { capitalize } from '@/utils/helpers'
import { useBrowser, useNFTPrice } from '@/hooks'

export const useBuyNFT = () => {
  const isBrowser = useBrowser()
  const router = useRouter()
  const [, setMintedTokenId] = useState<string>()
  const [mintLoading, setMintLoading] = useRecoilState(nftPaymentETHAtom)
  const { addToast } = useToasts()
  const nftQuantity = useRecoilValue(nftPaymentAtom)
  const { chain } = useNetwork()
  const { connector: activeConnector, isConnected } = useAccount()
  const { nftPrice } = useNFTPrice()

  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
  }
  const { writeAsync: mint } = useContractWrite({
    ...baseContract,
    functionName: 'mint',
    args: [nftQuantity],
    overrides: {
      value: nftPrice ? nftPrice?.mul(nftQuantity) : ethers.utils.parseEther('0.025'),
    },
    onSuccess: () => {
      addToast('Transaction successful', {})
    },
    onError(error) {
      addToast(capitalize(error.message.split('[')[0]), {})
    },
  })

  const { data: isPaused } = useContractRead<any, any, boolean>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'contractPaused',
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
        isBrowser ? localStorage.setItem('nftsBought', nftQuantity) : null
      }
    } catch (error: any) {
      addToast(capitalize(error?.reason), {})
    } finally {
      setMintLoading(false)
    }
  }

  return {
    mintLoading,
    buyNFT,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
    isPaused,
  }
}
