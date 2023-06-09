import { useEffect, useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { useToasts } from 'react-toast-notifications'
import { useAccount, useContractRead, useContractWrite, useNetwork } from 'wagmi'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'
import { nftPaymentAtom, nftPaymentETHAtom } from '@/state/atoms'
import { capitalize } from '@/utils/helpers'
import { useBrowser } from '@/hooks'

export const useBuyNFT = () => {
  const isBrowser = useBrowser()
  const router = useRouter()
  const [, setMintedTokenId] = useState<string>()
  const [mintLoading, setMintLoading] = useRecoilState(nftPaymentETHAtom)
  const { addToast } = useToasts()
  const [totalNfts, setTotalNfts] = useState<number>(0)
  const nftQuantity = useRecoilValue(nftPaymentAtom)

  const { chain } = useNetwork()
  const { connector: activeConnector, isConnected } = useAccount()

  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
  }

  const { data: price } = useContractRead<any, any, BigNumber>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'price',
  })

  const formatedPrice = price && (price?.toNumber() / 10 ** 18).toFixed(16)

  const { writeAsync: mint } = useContractWrite({
    ...baseContract,
    functionName: 'mint',
    args: [nftQuantity],
    overrides: { value: ethers.utils.parseEther(formatedPrice!.toString()) },
    onSuccess: () => {
      addToast('Transaction successful', {})
    },
  })

  const { data: isPaused } = useContractRead<any, any, boolean>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'contractPaused',
  })

  const { data } = useContractRead<any, any, BigNumber[]>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'totalSupply',
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

  useEffect(() => {
    setTotalNfts(Number(data?.toLocaleString()))
  }, [data])

  return {
    mintLoading,
    buyNFT,
    connected: activeConnector?.ready && isConnected,
    buyWith: chain?.nativeCurrency?.name,
    totalNfts,
    isPaused,
    price: formatedPrice,
  }
}
