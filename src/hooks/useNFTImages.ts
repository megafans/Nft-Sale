import useSWR from 'swr'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'

type Props = {
  address?: `0x${string}`
}

export const useNFTImages = ({ address }: Props) => {
  const { data, error, isLoading } = useSWR(`${api.URL}api/NFT/ListMyNFTs?walletAddress=${address}`, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: true,
    dedupingInterval: 10000,
    refreshInterval: 3000,
    refreshWhenHidden: true,
  })

  const nftList = data?.data.map((item: any) => {
    const rotate = Math.floor(Math.random() * 3) + 1

    return {
      ...item,
      rotate,
    }
  })

  const {
    data: nftFullList,
    error: errorFullList,
    isLoading: isLoadingFullList,
  } = useSWR(`/api/nfts/${address}`, async () => {
    const response = await fetch(`/api/nfts/${address}`)
    const data = await response.json()
    return data
  })

  return {
    nftFullList,
    errorFullList,
    isLoadingFullList,
    nftList: nftList,
    isLoading,
    isError: error,
  }
}
