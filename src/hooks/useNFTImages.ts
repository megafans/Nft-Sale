import useSWR from 'swr'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'

type Props = {
  address?: `0x${string}`
}

export const useNFTImages = ({ address }: Props) => {
  const { data, error, isLoading } = useSWR(`${api.URL}api/NFT/ListMyNFTs?walletAddress=${address}`, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
    dedupingInterval: 5000,
  })

  return {
    nftList: data?.data,
    isLoading,
    isError: error,
  }
}
