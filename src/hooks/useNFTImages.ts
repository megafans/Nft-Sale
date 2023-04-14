import useSWR from 'swr'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'

type Props = {
  address: string
}

export const useNFTImages = ({ address }: Props) => {
  const { data, error, isLoading } = useSWR(`${api.URL}api/NFT/ListMyNFTs?walletAddress=${address}`, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
    dedupingInterval: 5000,
  })

  console.log('useNFTImages', data, error, isLoading)

  return {
    data,
  }
}
