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

  return {
    nftList: data?.data,
    isLoading,
    isError: error,
  }
}
